import React from 'react';
import { Github, Linkedin, Instagram, Mail, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-serif text-white mb-8">Contact Me</h2>
        
        <p className="text-stone-400 mb-8 text-lg">
          If you'd like to contact me, <a href="mailto:hello@example.com" className="text-stone-200 underline decoration-1 underline-offset-4 hover:text-white transition-colors">email me here</a> or connect with me on LinkedIn.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
           <a href="#" className="px-6 py-3 bg-stone-700/50 hover:bg-stone-700 rounded-full text-stone-100 font-medium transition-all flex items-center gap-2">
             <Linkedin size={20} /> LinkedIn
           </a>
           <a href="#" className="px-6 py-3 bg-stone-700/50 hover:bg-stone-700 rounded-full text-stone-100 font-medium transition-all flex items-center gap-2">
             <Twitter size={20} /> Twitter
           </a>
           <a href="#" className="px-6 py-3 bg-stone-700/50 hover:bg-stone-700 rounded-full text-stone-100 font-medium transition-all flex items-center gap-2">
             <Instagram size={20} /> Instagram
           </a>
        </div>

        <div className="flex justify-center gap-8 text-stone-500 pt-8 border-t border-stone-800">
           <a href="#" className="hover:text-white transition-colors"><Github size={32} /></a>
           <a href="#" className="hover:text-white transition-colors"><Linkedin size={32} /></a>
           <a href="#" className="hover:text-white transition-colors"><Instagram size={32} /></a>
           <a href="#" className="hover:text-white transition-colors"><Mail size={32} /></a>
        </div>
        
        <p className="mt-8 text-sm text-stone-600">
          © {new Date().getFullYear()} Modern Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
