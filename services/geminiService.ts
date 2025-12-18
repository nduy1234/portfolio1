import { GoogleGenAI, Type } from "@google/genai";
import { SearchResult, ImageSize, AspectRatio } from "../types";

// Helper to manage the API client instance
// We recreate it when needed to ensure we pick up the latest selected key in specific contexts
const getAiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// --- Veo Video Generation ---

export const generateVeoVideo = async (
  prompt: string,
  base64Image: string,
  aspectRatio: AspectRatio
): Promise<string> => {
  // Paid key check
  const hasKey = await window.aistudio.hasSelectedApiKey();
  if (!hasKey) {
    await window.aistudio.openSelectKey();
    // Assuming success after dialog per instructions
  }

  // Re-initialize client to pick up potentially new key
  const ai = getAiClient();

  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt, // prompt is optional but helpful
    image: {
      imageBytes: base64Image,
      mimeType: 'image/jpeg', // Assuming JPEG for simplicity from canvas/input
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p', // Only 720p allowed for fast-generate currently
      aspectRatio: aspectRatio,
    }
  });

  // Polling loop
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Check every 5s
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!videoUri) {
    throw new Error("Failed to generate video URI");
  }

  // Append key for download/playback
  return `${videoUri}&key=${process.env.API_KEY}`;
};

// --- Pro Image Generation ---

export const generateProImage = async (
  prompt: string,
  size: ImageSize
): Promise<string> => {
  // Paid key check
  const hasKey = await window.aistudio.hasSelectedApiKey();
  if (!hasKey) {
    await window.aistudio.openSelectKey();
  }

  const ai = getAiClient();

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: prompt }],
    },
    config: {
      imageConfig: {
        imageSize: size,
        count: 1,
      },
    },
  });

  // Extract image from parts
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image data found in response");
};

// --- Search Grounding ---

export const searchWithGrounding = async (query: string): Promise<SearchResult> => {
  const ai = getAiClient();

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const text = response.text || "No response generated.";
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  
  const sources = chunks
    .filter((chunk: any) => chunk.web?.uri && chunk.web?.title)
    .map((chunk: any) => ({
      uri: chunk.web.uri,
      title: chunk.web.title,
    }));

  return { text, sources };
};

// --- Utility: File to Base64 ---
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};
