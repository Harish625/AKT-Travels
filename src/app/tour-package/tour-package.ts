import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PACKAGES } from '../package/package';

interface CategoryTab {
  id: string;
  label: string;
}

interface Destination {
  id: string;
  category: string;
  image: string;
  badge: string;
  title: string;
  location: string;
  description: string;
  vehicle: string;
}

@Component({
  selector: 'app-tour-package-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-package.html'
  // Styling lives in the GLOBAL stylesheet (tour-package.scss), not a
  // component-scoped file — same convention used across this project's
  // section partials.
})
export class TourPackageHeroComponent {
  private readonly whatsappNumber = '918508088851';

  // -------- Hero section data --------
  // NOTE: placeholder image — replace with the actual tour package photo.
  readonly heroImage = 'assets/image1.png';

  readonly tag = 'Featured Package';
  readonly title = 'Weekend Getaway Tour Packages';
  readonly description =
    'Handpicked destinations, comfortable travel, and flexible itineraries — ' +
    'everything planned so you can just enjoy the trip.';
  readonly price = 'Starts at ₹2,499 / person';
  readonly duration = '3 Days · 2 Nights';

  // -------- "Top Travel Destinations" section data --------
  readonly categories: CategoryTab[] = [
    { id: 'all', label: 'All Routes' },
    { id: 'coimbatore-local', label: 'Coimbatore Local' },
    { id: 'hill-stations', label: 'Hill Stations' },
    { id: 'pilgrimage', label: 'Pilgrimage' },
    { id: 'weekend-trips', label: 'Weekend Trips' }
  ];

  readonly activeCategory = signal<string>('all');

  // NOTE: image paths are placeholders — swap in real destination photography.
  readonly destinations: Destination[] = [
    // -------- Coimbatore Local --------
    {
      id: 'isha-yoga-center',
      category: 'coimbatore-local',
      image: 'assets/isha1.jpg',
      badge: 'Top Rated',
      title: 'Isha Yoga Center (Adiyogi)',
      location: 'Velliangiri Foothills, Coimbatore',
      description: 'Visit Adiyogi, Dhyanalinga & Theerthakund with our reliable 24/7 service.',
      vehicle: 'Taxi / TT'
    },
    {
      id: 'marudhamalai-temple',
      category: 'coimbatore-local',
      image: 'assets/Marudhamalai_Temple1.png',
      badge: 'Spiritual',
      title: 'Marudhamalai Murugan Temple',
      location: 'Hill Temple, Coimbatore',
      description: 'Safe and comfortable hill trips for families and group pilgrimages.',
      vehicle: 'SUV / Bus'
    },
    {
      id: 'kovai-kutralam',
      category: 'coimbatore-local',
      image: 'assets/kovaikuttralam1.jpg',
      badge: 'Fun Day',
      title: 'Kovai Kutralam / Black Thunder',
      location: 'Mettupalayam / Siruvani',
      description: 'Theme park or Siruvani Falls — best weekend outing for families.',
      vehicle: 'SUV / Bus'
    },
    {
      id: 'gedee-car-museum',
      category: 'coimbatore-local',
      image: 'assets/gedeecar1.jpg',
      badge: 'Heritage',
      title: 'Gedee Car Museum',
      location: 'Coimbatore City',
      description: 'A curated collection of vintage cars — an easy half-day city outing.',
      vehicle: 'Sedan / SUV'
    },
    {
      id: 'aliyar-dam-monkey-falls',
      category: 'coimbatore-local',
      image: 'assets/aliyardam1.jpg',
      badge: 'Nature',
      title: 'Aliyar Dam & Monkey Falls',
      location: 'Pollachi, Coimbatore',
      description: 'Scenic reservoir views and waterfalls, ideal for a relaxed day trip.',
      vehicle: 'SUV / Bus'
    },
    {
      id: 'topslip-anamalai',
      category: 'coimbatore-local',
      image: 'assets/Topslip1.png',
      badge: 'Wildlife',
      title: 'Topslip, Anamalai',
      location: 'Pollachi, Coimbatore',
      description: 'Forest safaris and greenery — a favorite for nature and wildlife lovers.',
      vehicle: 'SUV / Bus'
    },

    // -------- Hill Stations --------
    {
      id: 'ooty-coonoor',
      category: 'hill-stations',
      image: 'assets/ooty1.jpg',
      badge: 'Most Popular',
      title: 'Ooty & Coonoor',
      location: 'Nilgiris, Tamil Nadu',
      description: 'The Nilgiris\' signature hill stations — tea gardens, lakes, and cool weather.',
      vehicle: 'SUV / Tempo Traveller'
    },
    {
      id: 'kodaikanal',
      category: 'hill-stations',
      image: 'assets/kodaikanal1.jpg',
      badge: 'Scenic',
      title: 'Kodaikanal',
      location: 'Dindigul, Tamil Nadu',
      description: 'Misty hills, pine forests, and a peaceful lake — perfect for a longer getaway.',
      vehicle: 'SUV / Tempo Traveller'
    },
    {
      id: 'valparai',
      category: 'hill-stations',
      image: 'assets/valparai1.jpg',
      badge: 'Offbeat',
      title: 'Valparai',
      location: 'Coimbatore District',
      description: 'Winding ghat roads through tea estates, with a real chance of wildlife sightings.',
      vehicle: 'SUV / Bus'
    },
    {
      id: 'yercaud',
      category: 'hill-stations',
      image: 'assets/yercaud1.jpg',
      badge: 'Weekend Pick',
      title: 'Yercaud',
      location: 'Salem, Tamil Nadu',
      description: 'A quieter hill station with coffee estates and a calm lake at its center.',
      vehicle: 'SUV / Tempo Traveller'
    },
    {
      id: 'kolli-hills',
      category: 'hill-stations',
      image: 'assets/kolli1.jpg',
      badge: 'Offbeat',
      title: 'Kolli Hills',
      location: 'Namakkal, Tamil Nadu',
      description: '70 hairpin bends leading up to waterfalls and untouched greenery.',
      vehicle: 'SUV / Bus'
    },
    {
      id: 'yelagiri',
      category: 'hill-stations',
      image: 'assets/Yelagiri1.jpg',
      badge: 'Family Friendly',
      title: 'Yelagiri',
      location: 'Vellore District',
      description: 'A compact, easy-to-explore hill station great for short group trips.',
      vehicle: 'SUV / Tempo Traveller'
    },

    // -------- Pilgrimage --------
    {
      id: 'madurai-meenakshi',
      category: 'pilgrimage',
      image: 'assets/madurai.jpg',
      badge: 'Iconic',
      title: 'Madurai Meenakshi Amman Temple',
      location: 'Madurai, Tamil Nadu',
      description: 'One of Tamil Nadu\'s most iconic temples — comfortable long-distance travel arranged.',
      vehicle: 'SUV / Bus'
    },
    {
      id: 'rameswaram-temple',
      category: 'pilgrimage',
      image: 'assets/Rameshwaram-Temple1.jpg',
      badge: 'Sacred',
      title: 'Rameswaram Ramanathaswamy Temple',
      location: 'Rameswaram, Tamil Nadu',
      description: 'A major pilgrimage site, paired easily with Dhanushkodi on the same trip.',
      vehicle: 'SUV / Bus'
    },
    {
      id: 'palani-murugan',
      category: 'pilgrimage',
      image: 'assets/palani1.jpg',
      badge: 'Hill Temple',
      title: 'Palani Murugan Temple',
      location: 'Palani, Tamil Nadu',
      description: 'One of the six abodes of Lord Murugan, set on a hilltop.',
      vehicle: 'SUV / Bus'
    },
    {
      id: 'tiruvannamalai-temple',
      category: 'pilgrimage',
      image: 'assets/tiruvanamalai1.jpg',
      badge: 'Spiritual',
      title: 'Tiruvannamalai Arunachaleswarar Temple',
      location: 'Tiruvannamalai, Tamil Nadu',
      description: 'Home to the famous Girivalam path around the sacred hill.',
      vehicle: 'SUV / Bus'
    },
    {
      id: 'kanchipuram-temples',
      category: 'pilgrimage',
      image: 'assets/kanjipuram1.jpg',
      badge: 'Temple City',
      title: 'Kanchipuram Temples',
      location: 'Kanchipuram, Tamil Nadu',
      description: 'A city of a thousand temples, easily covered in a single day trip.',
      vehicle: 'SUV / Bus'
    },
    {
      id: 'thanjavur-brihadeeswarar',
      category: 'pilgrimage',
      image: 'assets/thanjore1.jpg',
      badge: 'UNESCO Site',
      title: 'Thanjavur Brihadeeswarar Temple',
      location: 'Thanjavur, Tamil Nadu',
      description: 'A UNESCO World Heritage Chola-era temple, a must for heritage travel.',
      vehicle: 'SUV / Bus'
    },

    // -------- Weekend Trips --------
    {
      id: 'hogenakkal-falls',
      category: 'weekend-trips',
      image: 'assets/hogenakkal1.jpg',
      badge: 'Waterfalls',
      title: 'Hogenakkal Falls',
      location: 'Dharmapuri, Tamil Nadu',
      description: 'Coracle rides and cascading falls — a popular short getaway.',
      vehicle: 'SUV / Bus'
    },
    {
      id: 'courtallam-falls',
      category: 'weekend-trips',
      image: 'assets/kuttralam1.jpg',
      badge: 'Waterfalls',
      title: 'Courtallam Falls',
      location: 'Tenkasi, Tamil Nadu',
      description: 'Known as the "Spa of South India" for its therapeutic waterfalls.',
      vehicle: 'SUV / Bus'
    },
    {
      id: 'kanyakumari',
      category: 'weekend-trips',
      image: 'assets/kaniyakumari1.jpg',
      badge: 'Coastal',
      title: 'Kanyakumari',
      location: 'Southern Tip, Tamil Nadu',
      description: 'Where three seas meet — sunrise and sunset views in one trip.',
      vehicle: 'SUV / Bus'
    },
    {
      id: 'mahabalipuram',
      category: 'weekend-trips',
      image: 'assets/Mahabalipuram1.jpg',
      badge: 'Heritage',
      title: 'Mahabalipuram',
      location: 'Near Chennai, Tamil Nadu',
      description: 'Shore Temple and rock-cut monuments, right along the coast.',
      vehicle: 'SUV / Bus'
    },
    {
      id: 'chettinad-karaikudi',
      category: 'weekend-trips',
      image: 'assets/Karaikudi-Chettinad.jpg',
      badge: 'Cultural',
      title: 'Karaikudi / Chettinad',
      location: 'Sivaganga District',
      description: 'Grand heritage mansions and the region\'s famous Chettinad cuisine.',
      vehicle: 'SUV / Bus'
    },
    {
      id: 'pichavaram',
      category: 'weekend-trips',
      image: 'assets/Pichavaram.jpg',
      badge: 'Nature',
      title: 'Pichavaram Mangrove Forest',
      location: 'Cuddalore, Tamil Nadu',
      description: 'Boat rides through one of the world\'s largest mangrove forests.',
      vehicle: 'SUV / Bus'
    }
  ];

  readonly filteredDestinations = computed(() => {
    const active = this.activeCategory();
    if (active === 'all') {
      return this.destinations;
    }
    return this.destinations.filter((destination) => destination.category === active);
  });

  constructor(private readonly router: Router) {}

  // -------- Hero actions --------
  enquireAboutTour(): void {
    const message = encodeURIComponent(
      `Hi AKT Travels, I'd like more details about the *${this.title}* tour package.`
    );
    window.open(`https://wa.me/${this.whatsappNumber}?text=${message}`, '_blank', 'noopener');
  }

  // -------- Destinations actions --------
  setCategory(categoryId: string): void {
    this.activeCategory.set(categoryId);
  }

  viewPackage(destination: Destination): void {
    const packageSlug = this.getPackageSlug(destination.id);
    this.router.navigate(['/package', packageSlug]);
  }

  private getPackageSlug(destinationId: string): string {
    const destinationKey = this.normalize(destinationId);

    let bestMatch = PACKAGES[0];
    let highestScore = 0;

    for (const pkg of PACKAGES) {
      const score = this.getMatchScore(destinationKey, pkg);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = pkg;
      }
    }

    return highestScore > 0 ? bestMatch.slug : destinationId;
  }

  private getMatchScore(destinationKey: string, pkg: { slug: string; name: string; place: string }): number {
    const sourceKey = this.normalize(`${pkg.slug} ${pkg.name} ${pkg.place}`);

    if (sourceKey.includes(destinationKey)) {
      return 10;
    }

    const destinationTokens = destinationKey.split('-').filter(Boolean);
    const sourceTokens = sourceKey.split(/[^a-z0-9]+/).filter(Boolean);
    const overlap = destinationTokens.filter((token) => sourceTokens.includes(token)).length;

    return overlap * 4;
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .trim();
  }
}