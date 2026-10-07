import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Blog, BlogStatus } from '../../../core/models/blog.model';
import { BlogService } from '../../../core/services/blog.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './blog-list.html',
  
})
export class BlogListComponent implements OnInit {
  private blogService = inject(BlogService);
  allBlogs: Blog[] = [];
  filtered: Blog[] = [];

  searchTerm = '';
  statusFilter: BlogStatus | 'all' = 'all';
  categoryFilter = 'all';
  categories: string[] = [];

  blogPendingDelete: Blog | null = null;
  toastMessage = '';

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.allBlogs = this.blogService.getAll();
    this.categories = Array.from(new Set(this.allBlogs.map(b => b.category)));
    this.applyFilters();
  }

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filtered = this.allBlogs.filter(b => {
      const matchesTerm =
        !term ||
        b.title.toLowerCase().includes(term) ||
        b.author.toLowerCase().includes(term) ||
        b.tags.some(t => t.toLowerCase().includes(term));
      const matchesStatus = this.statusFilter === 'all' || b.status === this.statusFilter;
      const matchesCategory = this.categoryFilter === 'all' || b.category === this.categoryFilter;
      return matchesTerm && matchesStatus && matchesCategory;
    });
  }

  toggleStatus(blog: Blog): void {
    this.blogService.toggleStatus(blog.id);
    this.reload();
    this.notify(`"${blog.title}" is now ${blog.status === 'published' ? 'a draft' : 'published'}.`);
  }

  confirmDelete(blog: Blog): void {
    this.blogPendingDelete = blog;
  }

  cancelDelete(): void {
    this.blogPendingDelete = null;
  }

  deleteConfirmed(): void {
    if (!this.blogPendingDelete) return;
    const title = this.blogPendingDelete.title;
    this.blogService.delete(this.blogPendingDelete.id);
    this.blogPendingDelete = null;
    this.reload();
    this.notify(`"${title}" was deleted.`);
  }

  private notify(msg: string): void {
    this.toastMessage = msg;
    setTimeout(() => (this.toastMessage = ''), 2600);
  }
}