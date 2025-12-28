
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, Search, Moon, Sun, X } from 'lucide-react';
import { TOOLS } from '../constants';

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const filteredTools = searchQuery.trim() 
    ? TOOLS.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">ToolBox<span className="text-indigo-600">Pro</span></span>
            </Link>
          </div>

          <div className="flex-1 max-w-lg mx-8 relative hidden md:block">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search for a tool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearch(true)}
                className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 text-sm dark:text-gray-200"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {showSearch && filteredTools.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 mt-2 rounded-xl shadow-xl max-h-96 overflow-y-auto z-50">
                {filteredTools.map(tool => (
                  <button
                    key={tool.id}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b last:border-none border-gray-50 dark:border-gray-700"
                    onClick={() => {
                      navigate(`/tools/${tool.path}`);
                      setSearchQuery('');
                      setShowSearch(false);
                    }}
                  >
                    <div className="font-bold text-gray-900 dark:text-white text-sm">{tool.name}</div>
                    <div className="text-xs text-gray-500 truncate">{tool.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <nav className="flex items-center space-x-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2 hidden sm:block"></div>
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hidden sm:block">All Tools</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
