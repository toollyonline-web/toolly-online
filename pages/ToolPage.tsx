
import React, { Suspense, lazy } from 'react';
import { Tool } from '../types';
import SEOHead from '../components/SEOHead';
import { ChevronLeft, Info, ShieldAlert, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// Lazy load tools
const QRGenerator = lazy(() => import('../tools/QRGenerator'));
const PasswordGenerator = lazy(() => import('../tools/PasswordGenerator'));
const TextCaseConverter = lazy(() => import('../tools/TextCaseConverter'));
const WordCounter = lazy(() => import('../tools/WordCounter'));
const ImageCompressor = lazy(() => import('../tools/ImageCompressor'));
const PDFMerger = lazy(() => import('../tools/PDFMerger'));
const JSONFormatter = lazy(() => import('../tools/JSONFormatter'));
const UUIDGenerator = lazy(() => import('../tools/UUIDGenerator'));

interface ToolPageProps {
  tool: Tool;
}

const ToolPage: React.FC<ToolPageProps> = ({ tool }) => {
  const renderTool = () => {
    switch (tool.id) {
      case 'qr-generator': return <QRGenerator />;
      case 'password-generator': return <PasswordGenerator />;
      case 'text-case': return <TextCaseConverter />;
      case 'word-counter': return <WordCounter />;
      case 'image-compressor': return <ImageCompressor />;
      case 'pdf-merge': return <PDFMerger />;
      case 'json-formatter': return <JSONFormatter />;
      case 'uuid-generator': return <UUIDGenerator />;
      default: return (
        <div className="text-center py-20 dark:text-white">
          <h2 className="text-2xl font-bold">Coming Soon</h2>
          <p className="text-gray-500 mt-2">Tool development in progress...</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 transition-colors">
      <SEOHead title={tool.seoTitle} description={tool.seoDescription} />
      
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:opacity-80 font-medium transition-all">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12 mb-8">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
              {tool.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">{tool.name}</h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-0">
              {tool.description}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 md:p-10 mb-8 min-h-[400px]">
          <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>}>
            {renderTool()}
          </Suspense>
        </div>

        {/* FAQs for SEO */}
        {tool.faqs && tool.faqs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {tool.faqs.map((faq, i) => (
                <details key={i} className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 transition-all hover:border-indigo-100">
                  <summary className="list-none flex justify-between items-center cursor-pointer font-bold text-gray-900 dark:text-white">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl flex items-start space-x-4 border border-blue-100 dark:border-blue-900/20">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-1">Local Processing</h3>
              <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                Security is our priority. Your data is processed in your RAM and cleared immediately.
              </p>
            </div>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl flex items-start space-x-4 border border-indigo-100 dark:border-indigo-900/20">
            <ShieldAlert className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-1">Privacy Guarantee</h3>
              <p className="text-sm text-indigo-800 dark:text-indigo-300 leading-relaxed">
                We use zero tracking and zero server-side storage for files. Your privacy is 100% protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
