
export enum ToolCategory {
  PDF = 'PDF Tools',
  IMAGE = 'Image Tools',
  MEDIA = 'Media Tools',
  UTILITY = 'Utility Tools',
  TEXT = 'Text & SEO Tools',
  DEVELOPER = 'Developer Tools'
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  path: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
  faqs?: FAQ[];
  isNew?: boolean;
}
