import { Injectable } from '@angular/core';
import { Blog, BlogDraft } from '../models/blog.model';

const STORAGE_KEY = 'akttravel-blogs';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private blogs: Blog[] = this.load();

  getAll(): Blog[] {
    return [...this.blogs].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  getById(id: string): Blog | undefined {
    return this.blogs.find(blog => blog.id === id);
  }

  create(draft: BlogDraft): Blog {
    const now = new Date().toISOString();
    const blog: Blog = { ...draft, id: crypto.randomUUID(), createdAt: now, updatedAt: now, views: 0 };
    this.blogs = [blog, ...this.blogs];
    this.persist();
    return blog;
  }

  update(id: string, draft: BlogDraft): void {
    this.blogs = this.blogs.map(blog => blog.id === id ? { ...blog, ...draft, updatedAt: new Date().toISOString() } : blog);
    this.persist();
  }

  toggleStatus(id: string): void {
    this.blogs = this.blogs.map(blog => blog.id === id ? { ...blog, status: blog.status === 'published' ? 'draft' : 'published', updatedAt: new Date().toISOString() } : blog);
    this.persist();
  }

  delete(id: string): void {
    this.blogs = this.blogs.filter(blog => blog.id !== id);
    this.persist();
  }

  getStats(): { total: number; published: number; drafts: number; totalViews: number } {
    return {
      total: this.blogs.length,
      published: this.blogs.filter(blog => blog.status === 'published').length,
      drafts: this.blogs.filter(blog => blog.status === 'draft').length,
      totalViews: this.blogs.reduce((total, blog) => total + blog.views, 0),
    };
  }

  private load(): Blog[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) as Blog[] : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.blogs));
  }
}