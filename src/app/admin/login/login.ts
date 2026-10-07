import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  email = '';
  password = '';
  remember = false;

  readonly showPassword = signal(false);
  readonly formError = signal(false);

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.formError.set(true);
      return;
    }

    this.formError.set(false);
    this.auth.login(this.email);

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/admin/dashboard';
    this.router.navigateByUrl(returnUrl);
  }
}
