
import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, X, MoveUp, MoveDown, Download, GripVertical, Loader2, CheckCircle2 } from 'lucide-react';

interface FileWithStatus {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'ready' | 'error';
}

const PDFMerger: React.FC = () => {
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(currentFiles => 
          currentFiles.map(f => 
            f.id === fileId ? { ...f, progress: 100, status: 'ready' } : f
          )
        );
      } else {
        setFiles(currentFiles => 
          currentFiles.map(f => 
            f.id === fileId ? { ...f, progress: Math.floor(progress) } : f
          )
        );
      }
    }, 200 + Math.random() * 300);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFilesArray = Array.from(e.target.files!).map(file => {
        const id = Math.random().toString(36).substr(2, 9);
        return {
          id,
          file,
          progress: 0,
          status: 'uploading' as const
        };
      });

      setFiles(prev => [...prev, ...newFilesArray]);
      
      // Start simulation for each new file
      newFilesArray.forEach(f => simulateUpload(f.id));
    }
    // Reset input
    e.target.value = '';
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < files.length) {
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      setFiles(newFiles);
    }
  };

  // Drag and Drop Logic
  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (files[index].status !== 'ready') {
      e.preventDefault();
      return;
    }
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newFiles = [...files];
    const itemToMove = newFiles.splice(draggedIndex, 1)[0];
    newFiles.splice(index, 0, itemToMove);
    
    setFiles(newFiles);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const allReady = files.length >= 2 && files.every(f => f.status === 'ready');

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="border-4 border-dashed border-gray-100 rounded-3xl p-10 text-center bg-gray-50 hover:bg-white hover:border-indigo-200 transition-all cursor-pointer relative group">
        <input 
          type="file" 
          multiple 
          accept=".pdf" 
          className="absolute inset-0 opacity-0 cursor-pointer z-10" 
          onChange={handleFileChange}
        />
        <div className="pointer-events-none">
          <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Add PDF Files</h3>
          <p className="text-gray-500">Drag and drop your PDF documents here or click to browse</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h4 className="font-bold text-gray-900 flex items-center">
              Processing Queue
              <span className="ml-3 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full">{files.length}</span>
            </h4>
            <button 
              onClick={() => setFiles([])}
              className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors uppercase tracking-widest"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-3">
            {files.map((fileStatus, idx) => (
              <div 
                key={fileStatus.id}
                draggable={fileStatus.status === 'ready'}
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={(e) => handleDrop(e, idx)}
                onDragEnd={handleDragEnd}
                className={`
                  relative flex flex-col p-4 bg-white border rounded-2xl transition-all duration-200
                  ${draggedIndex === idx ? 'opacity-40 border-indigo-300 scale-95' : 'border-gray-100 shadow-sm'}
                  ${dragOverIndex === idx && draggedIndex !== idx ? 'border-t-4 border-t-indigo-500 pt-2' : ''}
                  ${fileStatus.status === 'ready' ? 'hover:shadow-md cursor-grab active:cursor-grabbing' : 'opacity-80'}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className={`${fileStatus.status === 'ready' ? 'text-gray-300' : 'text-gray-100'}`}>
                      <GripVertical className="w-5 h-5" />
                    </div>
                    <div className={`${fileStatus.status === 'ready' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-400'} p-2.5 rounded-xl transition-colors`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-gray-800 truncate">{fileStatus.file.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">{(fileStatus.file.size / 1024 / 1024).toFixed(2)} MB</span>
                        {fileStatus.status === 'uploading' && (
                          <span className="text-[10px] font-bold text-indigo-400 uppercase flex items-center">
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" /> {fileStatus.progress}%
                          </span>
                        )}
                        {fileStatus.status === 'ready' && (
                          <span className="text-[10px] font-bold text-green-500 uppercase flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Ready
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); moveFile(idx, 'up'); }}
                        disabled={idx === 0 || fileStatus.status !== 'ready'}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 disabled:opacity-10 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Move Up"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); moveFile(idx, 'down'); }}
                        disabled={idx === files.length - 1 || fileStatus.status !== 'ready'}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 disabled:opacity-10 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Move Down"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="w-px h-6 bg-gray-100 mx-1 hidden md:block"></div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeFile(fileStatus.id); }}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove File"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar for each file */}
                {fileStatus.status === 'uploading' && (
                  <div className="mt-3 w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full transition-all duration-300 ease-out"
                      style={{ width: `${fileStatus.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-6">
            <button 
              onClick={() => {
                setIsMerging(true);
                setTimeout(() => setIsMerging(false), 2000);
              }}
              disabled={!allReady || isMerging}
              className={`
                w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center space-x-3
                ${!allReady || isMerging
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-indigo-200'
                }
              `}
            >
              {isMerging ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span>Merging Your PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-6 h-6" />
                  <span>Merge {files.length} Files and Download</span>
                </>
              )}
            </button>
            {!allReady && files.length >= 2 && (
              <p className="text-center text-xs text-indigo-400 mt-4 font-bold uppercase tracking-wider animate-pulse">
                Please wait for all files to finish processing...
              </p>
            )}
            {files.length < 2 && (
              <p className="text-center text-xs text-gray-400 mt-4 font-medium uppercase tracking-wider">
                Upload at least 2 files to enable merging
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFMerger;
