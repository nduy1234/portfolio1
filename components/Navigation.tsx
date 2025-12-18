import React from 'react';
import { Menu, X, Rocket, User, Briefcase, Code } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: <User size={18} /> },
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={18} /> },
    { id: 'experiences', label: 'Experiences', icon: <Briefcase size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-stone-50/90 backdrop-blur-md z-50 border-b border-stone-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => setActiveSection('home')} 
          className="text-2xl font-serif font-bold tracking-tighter flex items-center gap-2"
        >
          <Rocket className="text-stone-800" />
          <span>PORTFOLIO.</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
                activeSection === item.id ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
             onClick={() => setActiveSection('contact')}
             className="px-5 py-2 bg-stone-900 text-stone-50 rounded-full text-sm font-semibold hover:bg-stone-700 transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 shadow-xl">
          <div className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false);
                }}
                className={`text-left text-lg font-medium ${
                  activeSection === item.id ? 'text-stone-900' : 'text-stone-500'
                }`}
              >
                {item.label}
              </button>
            ))}
             <button 
             onClick={() => {
               setActiveSection('contact');
               setIsOpen(false);
             }}
             className="mt-2 w-full py-3 bg-stone-900 text-stone-50 rounded-lg text-center font-semibold"
            >
            Contact Me
          </button>
          </div>
        </div>
      )}
    </nav>
  );
};