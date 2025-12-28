
import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [title, description]);

  return null;
};

export default SEOHead;
