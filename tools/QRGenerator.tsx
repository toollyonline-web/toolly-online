
import React, { useState, useRef } from 'react';
import { Download, Share2, Copy, Check } from 'lucide-react';

const QRGenerator: React.FC = () => {
  const [text, setText] = useState('https://toolboxpro.com');
  const [qrSize, setQrSize] = useState(256);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // We'll use the browser's native API or a lightweight injection for QRCode if needed.
  // For this standalone code, we can use the 'qrcode' library pattern.
  // I will assume standard CDN availability for a fast implementation or a simplified drawing logic.
  
  const generateQR = () => {
    // In a real app we'd use `qrcode` package
    // For this demo, let's provide the UI and a link to a generator service or use a canvas mock.
    return `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(text)}`;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generateQR();
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div className="flex-1 space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Text or URL to Encode</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
            placeholder="Enter URL or text here..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">QR Code Size: {qrSize}px</label>
          <input 
            type="range" 
            min="128" 
            max="1024" 
            step="64"
            value={qrSize}
            onChange={(e) => setQrSize(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-8 border-2 border-dashed border-gray-200">
        <div className="bg-white p-4 rounded-xl shadow-lg mb-8">
          <img 
            src={generateQR()} 
            alt="Generated QR Code" 
            className="rounded-lg shadow-inner"
            style={{ width: '200px', height: '200px' }}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full">
          <button 
            onClick={handleDownload}
            className="flex items-center justify-center bg-indigo-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
          >
            <Download className="w-4 h-4 mr-2" /> Download
          </button>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(generateQR());
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex items-center justify-center bg-white text-gray-700 border border-gray-200 px-4 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all"
          >
            {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied URL' : 'Copy URL'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
