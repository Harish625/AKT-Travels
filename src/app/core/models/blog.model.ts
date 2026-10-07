export type BlogCategory = 'Mountains' | 'Beaches' | 'City Guides' | 'Food & Culture' | 'Road Trips' | 'Budget Travel';
export type BlogStatus = 'draft' | 'published';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: BlogCategory;
  author: string;
  tags: string[];
  status: BlogStatus;
  featured: boolean;
  readTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
  views: number;
}

export type BlogDraft = Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'views'>;