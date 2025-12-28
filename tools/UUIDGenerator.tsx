
import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Hash } from 'lucide-react';

const UUIDGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generateUUID = () => {
    const newUuids = Array.from({ length: count }, () => {
      // Basic v4 UUID generator using crypto.getRandomValues
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (window.crypto.getRandomValues(new Uint32Array(1))[0] & 0x0f) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    });
    setUuids(newUuids);
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl">
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Number of UUIDs</label>
          <input 
            type="number" 
            min="1" 
            max="100" 
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-full px-4 py-2 border rounded-xl dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
        </div>
        <button 
          onClick={generateUUID}
          className="w-full sm:w-auto mt-4 sm:mt-6 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Generate
        </button>
      </div>

      <div className="space-y-3">
        {uuids.length > 0 ? uuids.map((uuid, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm hover:border-indigo-100 dark:hover:border-indigo-900 transition-all">
            <span className="font-mono text-sm text-gray-600 dark:text-gray-300">{uuid}</span>
            <button 
              onClick={() => copyToClipboard(uuid, i)}
              className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all"
            >
              {copiedIdx === i ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        )) : (
          <div className="text-center py-10 text-gray-400">
            <Hash className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>Click generate to create unique identifiers</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UUIDGenerator;
