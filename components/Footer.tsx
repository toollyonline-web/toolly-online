
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, FileText } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">ToolBox Pro</h3>
            <p className="mb-4 max-w-sm">
              Your comprehensive online toolkit. We offer high-quality, free-to-use tools for PDF manipulation, image optimization, and utility tasks.
            </p>
            <div className="flex space-x-4 text-xs">
              <span className="flex items-center"><Shield className="w-3 h-3 mr-1" /> Secure Processing</span>
              <span className="flex items-center"><Lock className="w-3 h-3 mr-1" /> Privacy First</span>
              <span className="flex items-center"><FileText className="w-3 h-3 mr-1" /> No Storage</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><a href="#all-tools" className="hover:text-white transition-colors">All Tools</a></li>
              <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} ToolBox Pro. All rights reserved.</p>
          <div className="mt-4 md:mt-0 text-gray-500">
            Files are processed client-side and deleted automatically.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
