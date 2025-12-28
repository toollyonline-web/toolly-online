
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const TextCaseConverter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleUppercase = () => setText(text.toUpperCase());
  const handleLowercase = () => setText(text.toLowerCase());
  const handleSentenceCase = () => {
    const res = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
    setText(res);
  };
  const handleTitleCase = () => {
    const res = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    setText(res);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button onClick={handleUppercase} className="px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all">UPPERCASE</button>
        <button onClick={handleLowercase} className="px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all">lowercase</button>
        <button onClick={handleSentenceCase} className="px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all">Sentence case</button>
        <button onClick={handleTitleCase} className="px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all">Title Case</button>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-80 p-8 border-2 border-gray-100 rounded-3xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all resize-none text-lg leading-relaxed bg-gray-50"
          placeholder="Paste text here..."
        />
        <button 
          onClick={copyToClipboard}
          className="absolute right-6 bottom-6 bg-white p-3 rounded-xl shadow-md border border-gray-100 text-indigo-600 hover:text-indigo-800 transition-all flex items-center space-x-2 font-bold"
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
};

export default TextCaseConverter;
