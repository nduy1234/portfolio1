export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface SearchResult {
  text: string;
  sources: { uri: string; title: string }[];
}

export type ImageSize = "1K" | "2K" | "4K";
export type AspectRatio = "16:9" | "9:16";

// Extend Window interface for AI Studio specific methods
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}