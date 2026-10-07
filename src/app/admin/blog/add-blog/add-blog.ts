import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogCategory } from '../../../core/models/blog.model';
import { BlogService } from '../../../core/services/blog.service';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-blog.html',
  
})
export class BlogFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private blogService = inject(BlogService);
  mode: 'add' | 'edit' = 'add';
  blogId: string | null = null;
  toastMessage = '';

  categories: BlogCategory[] = ['Mountains', 'Beaches', 'City Guides', 'Food & Culture', 'Road Trips', 'Budget Travel'];

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    slug: ['', Validators.required],
    category: ['Mountains' as BlogCategory, Validators.required],
    author: ['Meera Krishnan', Validators.required],
    coverImage: ['', Validators.required],
    excerpt: ['', [Validators.required, Validators.maxLength(160)]],
    content: ['', Validators.required],
    tagsText: [''],
    readTimeMinutes: [5, [Validators.required, Validators.min(1)]],
    featured: [false],
    status: ['draft' as 'draft' | 'published'],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mode = 'edit';
      this.blogId = id;
      const existing = this.blogService.getById(id);
      if (existing) {
        this.form.patchValue({
          ...existing,
          tagsText: existing.tags.join(', '),
        });
      }
    }

    // Auto-generate the slug from the title while adding a new post,
    // unless the editor has already customised it.
    this.form.get('title')?.valueChanges.subscribe(title => {
      if (this.mode === 'add' && !this.form.get('slug')?.dirty) {
        this.form.patchValue({ slug: this.slugify(title || '') }, { emitEvent: false });
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  get coverPreview(): string {
    return this.form.value.coverImage || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop';
  }

  slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  saveAs(status: 'draft' | 'published'): void {
    this.form.patchValue({ status });
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notify('Please fill in all required fields.');
      return;
    }

    const v = this.form.value;
    const draft = {
      title: v.title!,
      slug: v.slug || this.slugify(v.title!),
      excerpt: v.excerpt!,
      content: v.content!,
      coverImage: v.coverImage!,
      category: v.category as BlogCategory,
      author: v.author!,
      tags: (v.tagsText || '').split(',').map(t => t.trim()).filter(Boolean),
      status: status,
      featured: !!v.featured,
      readTimeMinutes: Number(v.readTimeMinutes),
    };

    if (this.mode === 'edit' && this.blogId) {
      this.blogService.update(this.blogId, draft);
    } else {
      this.blogService.create(draft);
    }

    this.router.navigateByUrl('/admin/dashboard/blogs');
  }

  cancel(): void {
    this.router.navigateByUrl('/admin/dashboard/blogs');
  }

  private notify(msg: string): void {
    this.toastMessage = msg;
    setTimeout(() => (this.toastMessage = ''), 2600);
  }
}