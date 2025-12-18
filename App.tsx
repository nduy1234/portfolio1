import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Projects } from './components/Projects';
import { ChevronUp } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      <Navigation activeSection={activeSection} setActiveSection={scrollToSection} />

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
           <div className="w-full md:w-1/2 relative z-10">
              <div className="absolute top-10 left-10 w-full h-full border-2 border-stone-200 rounded-full hidden md:block z-[-1]"></div>
              <img 
                src="https://picsum.photos/800/800?grayscale" 
                alt="Profile" 
                className="w-full max-w-md mx-auto rounded-full shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
              />
           </div>
           <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
              <span className="text-stone-500 font-medium tracking-widest uppercase">Portfolio 2024</span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 leading-tight">
                Hi,<br/> I am <span className="italic">Salim Muradi</span>
              </h1>
              <p className="text-xl text-stone-600 max-w-lg mx-auto md:mx-0">
                A Multi talented software developer crafting digital experiences with code and creativity.
              </p>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-stone-900 text-stone-50 rounded-lg font-medium hover:bg-stone-700 transition-transform hover:-translate-y-1 inline-block"
              >
                Download My Resume
              </button>
           </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-serif mb-10">About</h2>
          <div className="space-y-6 text-stone-600 leading-relaxed text-lg text-justify md:text-center">
            <p>
              I am a passionate software engineer with a deep love for building scalable web applications. 
              My journey began with a curiosity for how things work on the internet, which quickly turned into a 
              career dedicated to solving complex problems through elegant code.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p className="font-serif italic text-xl text-stone-800 pt-4">
              "Creativity is intelligence having fun."
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <Projects />

      {/* Experiences Section */}
      <section id="experiences" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16">Experiences</h2>
          <div className="max-w-3xl mx-auto border-l-2 border-stone-200 pl-8 space-y-12 relative">
             {[
               { role: 'Senior Developer', company: 'Tech Corp', period: '2022 - Present', desc: 'Leading frontend architecture and mentoring junior developers.' },
               { role: 'Frontend Engineer', company: 'Creative Agency', period: '2020 - 2022', desc: 'Built award-winning websites for international clients using React and GSAP.' },
               { role: 'Junior Developer', company: 'Startup Inc', period: '2018 - 2020', desc: 'Collaborated on the core product team to deliver MVP features.' }
             ].map((exp, i) => (
               <div key={i} className="relative">
                 <div className="absolute -left-[41px] top-0 w-5 h-5 bg-stone-900 rounded-full border-4 border-white"></div>
                 <h3 className="text-2xl font-bold text-stone-900">{exp.role}</h3>
                 <span className="text-sm font-semibold text-stone-500 uppercase tracking-wider">{exp.company} | {exp.period}</span>
                 <p className="mt-2 text-stone-600">{exp.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Footer />
      </section>

      {/* Scroll Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-stone-900 text-white rounded-full shadow-lg hover:bg-stone-700 transition-all z-40"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default App;