import React, { useState } from 'react';
import { generateProImage } from '../services/geminiService';
import { ImageSize } from '../types';
import { Image as ImageIcon, Sparkles, Loader2, Download } from 'lucide-react';

export const ImageDemo: React.FC = () => {
  const [prompt, setPrompt] = useState('A futuristic city made of crystal and light, photorealistic, 8k');
  const [size, setSize] = useState<ImageSize>('1K');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const url = await generateProImage(prompt, size);
      setImageUrl(url);
    } catch (err: any) {
      setError(err.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 text-blue-700 rounded-lg">
          <ImageIcon size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-stone-900">Pro Image Studio</h3>
          <p className="text-sm text-stone-500">High-fidelity generation with Gemini 3 Pro</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Describe your imagination..."
          />
          <select 
            value={size} 
            onChange={(e) => setSize(e.target.value as ImageSize)}
            className="px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 font-medium focus:outline-none"
          >
            <option value="1K">1K Resolution</option>
            <option value="2K">2K Resolution</option>
            <option value="4K">4K Resolution</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full py-3 bg-stone-900 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
          Generate Masterpiece
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Display Area */}
        <div className="min-h-[400px] bg-stone-100 rounded-xl border border-stone-200 flex items-center justify-center relative overflow-hidden group">
          {imageUrl ? (
            <>
              <img src={imageUrl} alt="Generated" className="w-full h-full object-contain max-h-[600px]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end justify-end p-4 opacity-0 group-hover:opacity-100">
                <a href={imageUrl} download="gemini-art.png" className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Download size={20} className="text-stone-900" />
                </a>
              </div>
            </>
          ) : (
            <div className="text-stone-400 flex flex-col items-center">
               {loading ? <Loader2 className="animate-spin text-blue-500 mb-2" size={32} /> : <ImageIcon size={48} className="mb-2 opacity-50" />}
               <span className="text-sm">Result will appear here</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
