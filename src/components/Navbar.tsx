import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Photography', path: '/photography' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-12">
          <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Lá por Aí
          </Link>
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors ${
                  location.pathname === link.path 
                    ? 'text-[#ad2c00] dark:text-[#ef4815] border-b-2 border-[#ad2c00] pb-1 font-medium' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all rounded-full">
            <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">search</span>
          </button>
        </div>
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 h-[1px] w-full"></div>
    </header>
  );
};

export default Navbar;
