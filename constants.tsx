
import { Tool, ToolCategory } from './types';

export const TOOLS: Tool[] = [
  // PDF Tools
  {
    id: 'pdf-merge',
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into one single document easily.',
    category: ToolCategory.PDF,
    path: 'pdf-merge',
    icon: 'FilePlus',
    seoTitle: 'Merge PDF Online - Combine PDF Files for Free',
    seoDescription: 'The easiest way to combine PDF files. Select multiple PDF documents and merge them into one in seconds.',
    faqs: [
      { question: "Is there a limit to how many PDFs I can merge?", answer: "ToolBox Pro allows merging up to 20 files at once for optimal browser performance." },
      { question: "Are my files stored?", answer: "No, all processing happens locally in your browser. Your files never reach our servers." }
    ]
  },
  {
    id: 'pdf-protect',
    name: 'Protect PDF',
    description: 'Add a password and encrypt your PDF document.',
    category: ToolCategory.PDF,
    path: 'pdf-protect',
    icon: 'Lock',
    seoTitle: 'Protect PDF Online - Add Password to PDF',
    seoDescription: 'Secure your PDF files with a strong password. Fast, free and secure encryption.',
    isNew: true
  },
  // Image Tools
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Reduce image file size without losing quality.',
    category: ToolCategory.IMAGE,
    path: 'image-compressor',
    icon: 'Minimize2',
    seoTitle: 'Online Image Compressor - Reduce Image Size',
    seoDescription: 'Compress JPG, PNG, and WebP images while maintaining high quality. Perfect for web optimization.'
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Change the dimensions of your images quickly.',
    category: ToolCategory.IMAGE,
    path: 'image-resizer',
    icon: 'Maximize2',
    seoTitle: 'Online Image Resizer - Resize Images Instantly',
    seoDescription: 'Resize your images to specific pixel dimensions or percentage without losing aspect ratio.'
  },
  // Text & SEO Tools
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, and sentences in your text.',
    category: ToolCategory.TEXT,
    path: 'word-counter',
    icon: 'FileText',
    seoTitle: 'Online Word Counter - Count Words & Characters',
    seoDescription: 'Real-time word count, character count, and sentence count for any piece of text.'
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your designs and layouts.',
    category: ToolCategory.TEXT,
    path: 'lorem-ipsum',
    icon: 'Type',
    seoTitle: 'Lorem Ipsum Generator - Professional Placeholder Text',
    seoDescription: 'Instantly generate dummy text in paragraphs, words, or sentences.',
    isNew: true
  },
  // Developer Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Prettify, validate, and minify JSON data.',
    category: ToolCategory.DEVELOPER,
    path: 'json-formatter',
    icon: 'Code',
    seoTitle: 'Online JSON Formatter - Prettify and Validate JSON',
    seoDescription: 'Clean and format your JSON strings for better readability. Validates syntax in real-time.',
    isNew: true
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique v4 UUIDs for your applications.',
    category: ToolCategory.DEVELOPER,
    path: 'uuid-generator',
    icon: 'Hash',
    seoTitle: 'Free UUID Generator - Generate Random UUID v4',
    seoDescription: 'Generate single or bulk unique identifiers instantly.',
    isNew: true
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Convert text or files to Base64 format and vice versa.',
    category: ToolCategory.DEVELOPER,
    path: 'base64',
    icon: 'ArrowLeftRight',
    seoTitle: 'Base64 Encode & Decode Online',
    seoDescription: 'Simple and fast Base64 conversion for developers and engineers.',
    isNew: true
  }
];
