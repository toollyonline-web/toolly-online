
import React, { useState, useEffect, useCallback } from 'react';
import { Copy, RefreshCw, Check, Shield } from 'lucide-react';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = '';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') charset = 'abcdefghijklmnopqrstuvwxyz';

    let retVal = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      retVal += charset.charAt(array[i] % charset.length);
    }
    setPassword(retVal);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPasswordStrength = () => {
    let score = 0;
    if (length > 12) score += 2;
    if (includeUpper) score += 1;
    if (includeLower) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;

    if (score < 3) return { text: 'Weak', color: 'bg-red-500' };
    if (score < 5) return { text: 'Medium', color: 'bg-yellow-500' };
    return { text: 'Strong', color: 'bg-green-500' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="relative group">
        <div className="bg-gray-100 p-6 rounded-2xl text-center break-all font-mono text-2xl md:text-3xl font-bold text-gray-800 shadow-inner">
          {password}
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
          <button 
            onClick={generatePassword}
            className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md text-indigo-600 hover:text-indigo-800 transition-all"
            title="Regenerate"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button 
            onClick={copyToClipboard}
            className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md text-indigo-600 hover:text-indigo-800 transition-all"
            title="Copy"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-bold text-gray-700">Security Strength: {strength.text}</span>
          <Shield className={`w-4 h-4 ${strength.color.replace('bg-', 'text-')}`} />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className={`${strength.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${(password.length / 32) * 100}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-8 rounded-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4 flex justify-between">
              Password Length: <span className="text-indigo-600">{length}</span>
            </label>
            <input 
              type="range" 
              min="8" 
              max="64" 
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} className="w-5 h-5 rounded text-indigo-600" />
            <span className="text-gray-700 font-medium">Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} className="w-5 h-5 rounded text-indigo-600" />
            <span className="text-gray-700 font-medium">Lowercase (a-z)</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="w-5 h-5 rounded text-indigo-600" />
            <span className="text-gray-700 font-medium">Numbers (0-9)</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="w-5 h-5 rounded text-indigo-600" />
            <span className="text-gray-700 font-medium">Symbols (!@#$)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
