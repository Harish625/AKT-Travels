import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { TopbarComponent } from "./topbar/topbar";
import { NavbarComponent } from "./navbar/navbar";
import { FooterComponent } from "./mainfooter/mainfooter";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopbarComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('akttravel');
  protected readonly hidePublicChrome = signal(false);

  constructor(private router: Router) {
    this.setChromeVisibility(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => this.setChromeVisibility(event.urlAfterRedirects));
  }

  private setChromeVisibility(url: string): void {
    const path = url.split('?')[0].split('#')[0];
    this.hidePublicChrome.set(path === '/admin' || path.startsWith('/admin/'));
  }
}
