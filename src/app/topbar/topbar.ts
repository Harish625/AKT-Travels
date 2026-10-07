import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.html'
  // no styleUrls / styles - this component uses the shared
  // classes (.topbar, .topbar__inner, etc.) from the global
  // src/scss/main.scss, wired once in angular.json -> styles.
})
export class TopbarComponent {
  address = '65 Cheran Nagar, Periyakuli Privu, Chettipalayam, Coimbatore, Tamil Nadu 641201.';

  // Numbers kept WITHOUT '+' / spaces for wa.me / tel: links
  phone = '+918508088851';
  phoneDisplay = '+91 85080 88851';
  whatsappNumber = '918508088851';

  email = 'pgp23101999@gmail.com';

}