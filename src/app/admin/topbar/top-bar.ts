import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LayoutStateService } from '../../core/services/layout-state.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './top-bar.html',
})
export class TopbarComponent {
  private layoutState = inject(LayoutStateService);
  private auth = inject(AuthService);
  private router = inject(Router);

  accountMenuOpen = false;

  // Always reflects whoever is currently logged in — nothing here is
  // hardcoded, so the name/role update automatically per admin account.
  admin = this.auth.currentAdmin;

  get adminInitial(): string {
    return (this.admin()?.name || '?').charAt(0).toUpperCase();
  }

  toggleSidebar(): void {
    this.layoutState.toggleSidebar();
  }

  toggleAccountMenu(): void {
    this.accountMenuOpen = !this.accountMenuOpen;
  }

  logout(): void {
    this.accountMenuOpen = false;
    this.auth.logout();
    this.router.navigateByUrl('/admin');
  }

  // Close the account dropdown when clicking anywhere outside the topbar.
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.accountMenuOpen && !target.closest('.admin-chip')) {
      this.accountMenuOpen = false;
    }
  }
}
