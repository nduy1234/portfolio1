import React, { useState, useRef } from 'react';
import { generateVeoVideo, fileToBase64 } from '../services/geminiService';
import { AspectRatio } from '../types';
import { Video, Upload, Loader2, Play } from 'lucide-react';

export const VeoDemo: React.FC = () => {
  const [prompt, setPrompt] = useState('A cinematic shot with subtle motion');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [loading, setLoading] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setGeneratedVideoUrl(null);
    }
  };

  const handleGenerate = async () => {
    if (!imageFile) return;
    setLoading(true);
    setError(null);
    try {
      const base64 = await fileToBase64(imageFile);
      const url = await generateVeoVideo(prompt, base64, aspectRatio);
      setGeneratedVideoUrl(url);
    } catch (err: any) {
      setError(err.message || 'Failed to generate video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 text-purple-700 rounded-lg">
          <Video size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-stone-900">Veo Video Generator</h3>
          <p className="text-sm text-stone-500">Bring images to life with Veo 3.1</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Source Image</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-stone-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-stone-50 transition-colors h-64 relative overflow-hidden"
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="text-center text-stone-500">
                  <Upload className="mx-auto mb-2" size={32} />
                  <span className="text-sm">Click to upload an image</span>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/jpeg, image/png" 
              />
            </div>
          </div>

          {/* Controls */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Prompt (Optional)</label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Describe the motion..."
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-stone-700 mb-2">Aspect Ratio</label>
             <div className="flex gap-4">
                <button 
                  onClick={() => setAspectRatio('16:9')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border ${aspectRatio === '16:9' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
                >
                  16:9 Landscape
                </button>
                <button 
                  onClick={() => setAspectRatio('9:16')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border ${aspectRatio === '9:16' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
                >
                  9:16 Portrait
                </button>
             </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!imageFile || loading}
            className="w-full py-3 bg-stone-900 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="animate-spin" size={20} /> Generating (takes ~1-2 min)...</> : <><Play size={20} /> Generate Video</>}
          </button>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Output */}
        <div className="bg-stone-100 rounded-xl flex items-center justify-center h-full min-h-[300px] border border-stone-200 overflow-hidden relative">
           {generatedVideoUrl ? (
             <video controls className="w-full h-full object-contain bg-black" src={generatedVideoUrl} autoPlay loop />
           ) : (
             <div className="text-stone-400 text-center p-6">
                {loading ? (
                   <div className="flex flex-col items-center gap-3">
                     <Loader2 className="animate-spin text-purple-600" size={40} />
                     <p>AI is dreaming up your video...</p>
                   </div>
                ) : (
                   <p>Generated video will appear here.</p>
                )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
