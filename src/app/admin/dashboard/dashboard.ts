import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Blog } from '../../core/models/blog.model';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
 
})
export class DashboardComponent implements OnInit {
  stats = { total: 0, published: 0, drafts: 0, totalViews: 0 };
  recentBlogs: Blog[] = [];
  today = new Date();

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.stats = this.blogService.getStats();
    this.recentBlogs = this.blogService.getAll().slice(0, 5);
  }
}