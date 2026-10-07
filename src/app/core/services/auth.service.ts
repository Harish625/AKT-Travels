import { Injectable, signal } from '@angular/core';

export interface AdminUser {
  name: string;
  role: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly currentAdmin = signal<AdminUser | null>({
    name: 'Meera Krishnan',
    role: 'Content Editor',
    email: 'admin@akttravels.com',
  });

  login(email: string): void {
    this.currentAdmin.set({
      name: 'Meera Krishnan',
      role: 'Content Editor',
      email,
    });
  }

  logout(): void {
    this.currentAdmin.set(null);
  }
}
