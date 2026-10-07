import { Component, HostListener, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';


interface DropdownItem {
  label: string;
  link: string;
  icon: 'sedan' | 'suv' | 'van' | 'bus' | 'briefcase' | 'graduation';
}

interface NavLink {
  label: string;
  link: string;
  type: 'link';
}

interface NavDropdown {
  label: string;
  link: string;
  type: 'dropdown';
  items: DropdownItem[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  readonly ctaLink = '';
  readonly adminLink = '/admin';
  readonly adminReturnUrl = '/admin/dashboard';

  readonly navItems: (NavLink | NavDropdown)[] = [
    { label: 'Home', link: '', type: 'link' },
    {
      label: 'Customer Type',
      link: '',
      type: 'dropdown',
      items: [
        { label: 'Corporate Rental', link: 'corporate-rental', icon: 'briefcase' },
        { label: 'Student Rental', link: '/student-rental', icon: 'graduation' }
      ]
    },
    { label: 'Tour Packages', link: '/tour-packages', type: 'link' },
    { label: 'Contact Us', link: '/contact', type: 'link' }
  ];

  readonly mobileOpen = signal(false);
  readonly openDropdown = signal<string | null>(null);
  readonly scrolled = signal(false);

  constructor() {
    this.updateScrolledState();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrolledState();
  }

  private updateScrolledState(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  toggleMobileMenu(): void {
    this.mobileOpen.update(v => !v);
    if (!this.mobileOpen()) {
      this.openDropdown.set(null);
    }
  }

  closeMobileMenu(): void {
    this.mobileOpen.set(false);
    this.openDropdown.set(null);
  }

  toggleDropdown(label: string): void {
    this.openDropdown.update(current => (current === label ? null : label));
  }
}
