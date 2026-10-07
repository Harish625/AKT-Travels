import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutStateService } from '../../core/services/layout-state.service';
import { AuthService } from '../../core/services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: { label: string; route: string }[];
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  
})
export class SidebarComponent {
  private layoutState = inject(LayoutStateService);
  private auth = inject(AuthService);
  private router = inject(Router);

  blogMenuOpen = false;

  constructor() {
    this.blogMenuOpen = this.router.url.startsWith('/admin/dashboard/blogs');
  }

  // Read as a getter so the template always reflects the shared signal,
  // without this component needing to own the open/closed state itself.
  get sidebarOpen(): boolean {
    return this.layoutState.sidebarOpen();
  }

  nav: NavItem[] = [
    { label: 'Dashboard', icon: 'grid', route: '/admin/dashboard' },
    {
      label: 'Blog Management',
      icon: 'book',
      children: [
        { label: 'All Blogs', route: '/admin/dashboard/blogs' },
        { label: 'Add Blog', route: '/admin/dashboard/blogs/add' },
      ],
    },
  ];

  toggleBlogMenu(): void {
    this.blogMenuOpen = !this.blogMenuOpen;
  }

  closeSidebar(): void {
    this.layoutState.closeSidebar();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/admin');
  }
}
