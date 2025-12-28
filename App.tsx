
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ToolPage from './pages/ToolPage';
import SEOHead from './components/SEOHead';
import { TOOLS } from './constants';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <SEOHead 
          title="ToolBox Pro | Professional Online PDF & Image Tools" 
          description="Free, fast, and secure online tools for PDF, Images, and more. No registration required. Client-side processing for privacy."
        />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {TOOLS.map(tool => (
              <Route 
                key={tool.id} 
                path={`/tools/${tool.path}`} 
                element={<ToolPage tool={tool} />} 
              />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
