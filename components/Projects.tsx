import React from 'react';
import { Project } from '../types';
import { ExternalLink } from 'lucide-react';

const projects: Project[] = [
  {
    id: 1,
    title: "YouTube Clone",
    description: "Youtube clone was the first real project I have worked on that I learn many things from it. I still sometimes lorem ipsum it very well.",
    imageUrl: "https://picsum.photos/600/350?random=1",
    tags: ["React", "API", "Video"]
  },
  {
    id: 2,
    title: "Eco Dashboard",
    description: "A comprehensive dashboard for tracking environmental impact metrics using real-time data visualization libraries.",
    imageUrl: "https://picsum.photos/600/350?random=2",
    tags: ["D3.js", "Tailwind", "Dashboard"]
  },
  {
    id: 3,
    title: "AI Chat Interface",
    description: "Modern chat application interface leveraging generative AI for smart responses and context awareness.",
    imageUrl: "https://picsum.photos/600/350?random=3",
    tags: ["Gemini", "TypeScript", "WebSocket"]
  }
];

export const Projects: React.FC = () => {
  return (
    <section className="py-20 bg-stone-50" id="projects">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-serif text-center mb-16 text-stone-900">Projects</h2>
        
        <div className="flex flex-col gap-20">
          {projects.map((project, index) => (
            <div key={project.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 group`}>
              
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative">
                <div className={`absolute inset-0 bg-stone-900 rounded-2xl transform transition-transform duration-300 ${index % 2 === 0 ? '-rotate-3 group-hover:-rotate-6' : 'rotate-3 group-hover:rotate-6'} opacity-10 translate-y-4 translate-x-4`}></div>
                <div className="relative overflow-hidden rounded-2xl shadow-lg border border-stone-200 bg-white">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                <h3 className="text-3xl font-bold text-stone-800">{project.title}</h3>
                <p className="text-stone-600 leading-relaxed text-lg">{project.description}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-stone-200 text-stone-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="mt-4 text-stone-900 font-bold border-b-2 border-stone-900 pb-1 inline-flex items-center gap-2 hover:text-stone-600 hover:border-stone-600 transition-colors">
                  See More <ExternalLink size={16} />
                </button>
              </div>

            </div>
          ))}
        </div>

        <div className="text-center mt-20">
           <button className="text-lg font-semibold text-stone-500 hover:text-stone-900 transition-colors border-b border-transparent hover:border-stone-900">
             View All Projects..
           </button>
        </div>
      </div>
    </section>
  );
};
