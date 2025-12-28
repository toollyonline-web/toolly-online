
import React, { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon, CheckCircle } from 'lucide-react';

const ImageCompressor: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState({ original: 0, compressed: 0 });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setCompressedUrl(null);
      setStats({ original: file.size, compressed: 0 });
    }
  };

  const compressImage = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = URL.createObjectURL(selectedImage);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedUrl(URL.createObjectURL(blob));
            setStats(prev => ({ ...prev, compressed: blob.size }));
            setIsProcessing(false);
          }
        },
        selectedImage.type,
        quality
      );
    };
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      {!selectedImage ? (
        <div className="border-4 border-dashed border-gray-100 rounded-3xl p-20 flex flex-col items-center justify-center text-center hover:border-indigo-200 transition-all cursor-pointer bg-gray-50 group">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            id="image-upload" 
            onChange={handleFileChange}
          />
          <label htmlFor="image-upload" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
            <div className="bg-indigo-100 p-6 rounded-2xl text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
              <Upload className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Image to Compress</h3>
            <p className="text-gray-500 max-w-xs">Supports JPG, PNG, and WebP. Max 10MB.</p>
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-2xl p-4 flex items-center justify-center overflow-hidden h-64 border border-gray-200">
              <img src={previewUrl!} alt="Original" className="max-h-full object-contain" />
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-gray-700">
              <span>Original Size</span>
              <span className="text-gray-400">{formatSize(stats.original)}</span>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-2xl space-y-4">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">
                Compression Quality: <span className="text-indigo-600">{Math.round(quality * 100)}%</span>
              </label>
              <input 
                type="range" 
                min="0.1" 
                max="1" 
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <button 
                onClick={compressImage}
                disabled={isProcessing}
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg disabled:bg-gray-400"
              >
                {isProcessing ? 'Processing...' : 'Compress Now'}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-2xl p-4 flex items-center justify-center overflow-hidden h-64 border-2 border-indigo-100 border-dashed">
              {compressedUrl ? (
                <img src={compressedUrl} alt="Compressed" className="max-h-full object-contain" />
              ) : (
                <div className="text-center text-indigo-300">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-bold uppercase tracking-widest">Result Preview</p>
                </div>
              )}
            </div>
            {compressedUrl && (
              <>
                <div className="flex justify-between items-center text-sm font-bold text-gray-900">
                  <span>Compressed Size</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">{formatSize(stats.compressed)}</span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">-{Math.round((1 - stats.compressed / stats.original) * 100)}%</span>
                  </div>
                </div>
                <a 
                  href={compressedUrl} 
                  download={`compressed-${selectedImage.name}`}
                  className="block w-full text-center py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg"
                >
                  <Download className="w-5 h-5 inline-block mr-2" /> Download Result
                </a>
              </>
            )}
            <button 
              onClick={() => { setSelectedImage(null); setCompressedUrl(null); }}
              className="w-full text-center text-gray-400 hover:text-gray-600 text-sm font-bold transition-colors"
            >
              Reset and Upload New
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
