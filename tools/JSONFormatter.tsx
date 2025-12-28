
import React, { useState } from 'react';
import { Copy, Check, Trash, Code } from 'lucide-react';

const JSONFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatJSON = (indent: number) => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, indent));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => formatJSON(2)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all text-sm">Beautify (2 Space)</button>
        <button onClick={() => formatJSON(4)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all text-sm">Beautify (4 Space)</button>
        <button onClick={minifyJSON} className="px-4 py-2 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-900 transition-all text-sm">Minify</button>
        <button onClick={() => setInput('')} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-bold hover:bg-red-100 transition-all text-sm flex items-center">
          <Trash className="w-4 h-4 mr-2" /> Clear
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-mono">
          Invalid JSON: {error}
        </div>
      )}

      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-96 p-6 bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-mono text-sm leading-relaxed dark:text-gray-200"
          placeholder='Paste your JSON here e.g. {"name": "John", "age": 30}'
        />
        <button 
          onClick={copyToClipboard}
          className="absolute right-4 bottom-4 bg-white dark:bg-gray-700 p-2.5 rounded-xl shadow-md border border-gray-100 dark:border-gray-600 text-indigo-600 dark:text-indigo-400 hover:scale-105 transition-all"
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default JSONFormatter;
