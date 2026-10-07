import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface FooterLink {
  label: string;
  url: string;
}

interface SocialLink {
  label: string;
  icon: string;  // Bootstrap Icons class
  url: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mainfooter.html',
  // Styling lives in the GLOBAL stylesheet (footer.scss), not a
  // component-scoped file — see the import note at the bottom of footer.scss.
})
export class FooterComponent {
  readonly quickLinks: FooterLink[] = [
    { label: 'Home', url: 'https://www.tourtravels.app/#home' },
    { label: 'Corporate Rental', url: 'https://www.tourtravels.app/#corporate' },
    { label: 'Student Rental', url: 'https://www.tourtravels.app/#corporate' },
    { label: 'Contact Us', url: 'https://www.tourtravels.app/#contact' }
  ];

  readonly destinations: FooterLink[] = [
    { label: 'Ooty', url: 'https://www.tourtravels.app/#packages' },
    { label: 'Kodaikanal', url: 'https://www.tourtravels.app/#packages' },
    { label: 'Munnar', url: 'https://www.tourtravels.app/#packages' },
    { label: 'Palani', url: 'https://www.tourtravels.app/#packages' },
    { label: 'Madurai', url: 'https://www.tourtravels.app/#packages' },
    { label: 'Rameswaram', url: 'https://www.tourtravels.app/#packages' },
    { label: 'Kanyakumari', url: 'https://www.tourtravels.app/#packages' },
    { label: 'Coorg', url: 'https://www.tourtravels.app/#packages' },
    { label: 'Bangalore', url: 'https://www.tourtravels.app/#packages' }
  ];

  // NOTE: replace '#' with your real profile URLs.
  readonly socialLinks: SocialLink[] = [
    { label: 'Facebook', icon: 'bi-facebook', url: '#' },
    { label: 'Instagram', icon: 'bi-instagram', url: '#' },
    { label: 'WhatsApp', icon: 'bi-whatsapp', url: 'https://wa.me/918508088851' },
    { label: 'YouTube', icon: 'bi-youtube', url: '#' }
  ];

  readonly currentYear = new Date().getFullYear();
}