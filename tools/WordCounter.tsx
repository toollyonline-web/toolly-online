
import React, { useState } from 'react';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-indigo-50 p-6 rounded-2xl text-center">
          <div className="text-3xl font-black text-indigo-600">{wordCount}</div>
          <div className="text-sm font-bold text-indigo-400 uppercase tracking-widest mt-1">Words</div>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl text-center">
          <div className="text-3xl font-black text-blue-600">{charCount}</div>
          <div className="text-sm font-bold text-blue-400 uppercase tracking-widest mt-1">Characters</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-2xl text-center">
          <div className="text-3xl font-black text-purple-600">{sentenceCount}</div>
          <div className="text-sm font-bold text-purple-400 uppercase tracking-widest mt-1">Sentences</div>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl text-center">
          <div className="text-3xl font-black text-green-600">{readTime} min</div>
          <div className="text-sm font-bold text-green-400 uppercase tracking-widest mt-1">Read Time</div>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-80 p-8 border-2 border-gray-100 rounded-3xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all resize-none text-lg leading-relaxed"
        placeholder="Start typing or paste your content here..."
      />

      <div className="flex justify-end">
        <button 
          onClick={() => setText('')}
          className="text-red-500 font-bold hover:text-red-700 transition-colors"
        >
          Clear Everything
        </button>
      </div>
    </div>
  );
};

export default WordCounter;
