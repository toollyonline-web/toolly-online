
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../constants';
import { ToolCategory } from '../types';
import * as Icons from 'lucide-react';

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'All'>('All');
  const categories = Object.values(ToolCategory);

  const filteredTools = useMemo(() => {
    if (activeCategory === 'All') return TOOLS;
    return TOOLS.filter(t => t.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pb-20 bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-700 to-indigo-900 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Professional <span className="text-indigo-200">Online Tools</span> <br/>for Everyone.
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            100% Free, Private, and Secure. All processing is done locally on your device.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === 'All' ? 'bg-white text-indigo-700' : 'bg-indigo-600 bg-opacity-30 hover:bg-opacity-50 text-white'}`}
            >
              All Tools
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-white text-indigo-700' : 'bg-indigo-600 bg-opacity-30 hover:bg-opacity-50 text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <div id="all-tools" className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map(tool => {
            const Icon = (Icons as any)[tool.icon] || Icons.File;
            return (
              <Link 
                key={tool.id} 
                to={`/tools/${tool.path}`}
                className="group relative bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-900 transition-all duration-300"
              >
                {tool.isNew && (
                  <span className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">New</span>
                )}
                <div className="bg-indigo-50 dark:bg-gray-800 w-12 h-12 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                  OPEN TOOL <Icons.ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Core Web Vitals Optimization: Skeletons could be here if loading */}
    </div>
  );
};

export default Home;
