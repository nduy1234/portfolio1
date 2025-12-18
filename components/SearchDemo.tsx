import React, { useState } from 'react';
import { searchWithGrounding } from '../services/geminiService';
import { SearchResult } from '../types';
import { Search, Globe, ExternalLink, Loader2, ArrowRight } from 'lucide-react';

export const SearchDemo: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await searchWithGrounding(query);
      setResult(res);
    } catch (err) {
      console.error(err);
      setResult({ text: "Sorry, I couldn't connect to the knowledge base right now.", sources: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 text-green-700 rounded-lg">
          <Globe size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-stone-900">Knowledge Search</h3>
          <p className="text-sm text-stone-500">Grounded in real-world data</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask me about current tech trends..."
          className="w-full pl-12 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
        <button 
          type="submit" 
          disabled={loading || !query}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-stone-900 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={16} />}
        </button>
      </form>

      <div className="flex-grow bg-stone-50 rounded-xl p-6 border border-stone-100 overflow-y-auto">
        {result ? (
          <div className="space-y-4">
            <div className="prose prose-stone text-sm leading-relaxed text-stone-700">
              {result.text}
            </div>
            
            {result.sources.length > 0 && (
              <div className="pt-4 border-t border-stone-200 mt-4">
                <h4 className="text-xs font-bold uppercase text-stone-500 mb-3 tracking-wider">Sources</h4>
                <div className="grid grid-cols-1 gap-2">
                  {result.sources.map((source, idx) => (
                    <a 
                      key={idx} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-stone-200 hover:border-green-300 hover:shadow-sm transition-all group"
                    >
                      <span className="text-sm text-stone-700 truncate font-medium">{source.title}</span>
                      <ExternalLink size={14} className="text-stone-400 group-hover:text-green-600" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-stone-400 text-sm">
            Results will appear here with source citations.
          </div>
        )}
      </div>
    </div>
  );
};
