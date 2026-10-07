import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

type TourPackage = {
  slug: string;
  name: string;
  place: string;
  badge: string;
  heroImage: string;
  tagline: string;
  overview: string;
  duration: string;
  groupSize: string;
  bestTime: string;
  transport: string;
  priceFrom: number;
  priceUnit: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
    meals: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
};

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './package.html',
  
})
export class PackageComponent implements OnInit {
  package: TourPackage | undefined;

  booking = {
    name: '',
    phone: '',
    travelers: 1,
    date: '',
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const slug = paramMap.get('slug') ?? '';
      this.package = this.resolvePackage(slug);
    });
  }

  private resolvePackage(slug: string): TourPackage | undefined {
    const normalized = slug.trim();
    if (!normalized) {
      return undefined;
    }

    const directMatch = getPackageBySlug(normalized);
    if (directMatch) {
      return directMatch;
    }

    return (
      PACKAGES.find((pkg) => pkg.slug.startsWith(normalized)) ??
      PACKAGES.find((pkg) => pkg.slug.includes(normalized) || normalized.includes(pkg.slug))
    );
  }

  backToPackages(): void {
    this.router.navigate(['/tour-packages']);
  }

  goToEnquiry(): void {
    const packageName = this.package?.name ?? 'this package';
    const message = encodeURIComponent(
      `Hi AKT Travels, I'd like to enquire about *${packageName}*.`
    );
    window.open(`https://wa.me/918508088851?text=${message}`, '_blank', 'noopener');
  }

  submitBooking(): void {
    const packageName = this.package?.name ?? 'this package';
    const lines = [
      `Hi AKT Travels, I'd like to book *${packageName}*.`,
      `Name: ${this.booking.name}`,
      `Phone: ${this.booking.phone}`,
      `Travelers: ${this.booking.travelers}`,
      this.booking.date ? `Preferred date: ${this.booking.date}` : '',
    ].filter(Boolean);
    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/918508088851?text=${message}`, '_blank', 'noopener');
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('en-IN').format(value);
  }

  starsArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}

export const PACKAGES: TourPackage[] = [
  {
    slug: 'isha-yoga-center-adiyogi',
    name: 'Isha Yoga Center (Adiyogi)',
    place: 'Coimbatore, Tamil Nadu',
    badge: 'Popular',
    heroImage: 'assets/isha2.jpg',
    tagline: 'Home to the 112-foot Adiyogi bust and the Dhyanalinga meditation space.',
    overview:
      'A calm, well-paced day trip to one of Coimbatore\'s most visited spiritual landmarks. The Isha Yoga Center sits at the foothills of the Velliangiri Mountains and combines the towering Adiyogi Shiva statue with landscaped gardens, the Dhyanalinga yogic temple, and a quiet, forested setting that makes for an easy half-day or full-day visit.',
    duration: '1 Day',
    groupSize: '2 – 12 travelers',
    bestTime: 'October to March',
    transport: 'SUV / Bus',
    priceFrom: 1499,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Coimbatore pickup to Isha Yoga Center',
        description:
          'Morning pickup from your hotel or a designated point in Coimbatore. Drive to the Velliangiri foothills, visit the Adiyogi statue, Dhyanalinga, and the surrounding gardens at a relaxed pace, then return by evening.',
        meals: 'Breakfast, Lunch',
      },
    ],
    inclusions: [
      'AC vehicle pickup and drop from Coimbatore',
      'Driver and fuel charges',
      'Bottled drinking water on board',
      'Assistance with parking and entry queues',
      'Breakfast and lunch as per itinerary',
    ],
    exclusions: [
      'Personal expenses and shopping',
      'Camera charges inside the premises, if applicable',
      'Any meal not mentioned in inclusions',
      'Tips and gratuities',
    ],
    highlights: [
      '112-foot Adiyogi Shiva statue',
      'Dhyanalinga meditation space',
      'Foothill views of the Velliangiri range',
    ],
  },
  {
    slug: 'marudhamalai-murugan-temple',
    name: 'Marudhamalai Murugan Temple',
    place: 'Coimbatore, Tamil Nadu',
    badge: 'Pilgrimage',
    heroImage: 'assets/marudhamalai.jpg',
    tagline: 'A hilltop shrine to Lord Murugan with sweeping views of Coimbatore city.',
    overview:
      'Marudhamalai Temple sits on a forested hillock on the western edge of Coimbatore and is one of the region\'s most visited Murugan shrines. The drive up offers views over the city and the Western Ghats, and the temple itself is known for its calm atmosphere outside of festival days.',
    duration: '1 Day',
    groupSize: '2 – 12 travelers',
    bestTime: 'Year-round; mornings recommended',
    transport: 'SUV / Bus',
    priceFrom: 1199,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Coimbatore to Marudhamalai and back',
        description:
          'Pickup from Coimbatore, drive to the temple hill, darshan and time to explore the surrounding gardens and viewpoints, then return.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'AC vehicle pickup and drop',
      'Driver and fuel charges',
      'Bottled drinking water',
      'Local route guidance',
    ],
    exclusions: [
      'Temple offerings and special darshan tickets',
      'Meals other than breakfast',
      'Personal expenses',
    ],
    highlights: [
      'Hilltop views over Coimbatore',
      'Peaceful temple gardens',
      'Short, easy half-day visit',
    ],
  },
  {
    slug: 'kovai-kutralam-black-thunder',
    name: 'Kovai Kutralam / Black Thunder',
    place: 'Coimbatore, Tamil Nadu',
    badge: 'Family Friendly',
    heroImage: 'assets/kovaikutralam.jpg',
    tagline: 'Waterfalls and a water theme park, ideal for a family day out.',
    overview:
      'This package pairs the Kovai Kutralam waterfalls with Black Thunder, one of South India\'s better-known water and amusement parks. It\'s a favourite for families and groups looking for an active, fun-filled day away from the city, with the option to focus on either the falls or the park depending on the season.',
    duration: '1 Day',
    groupSize: '2 – 15 travelers',
    bestTime: 'June to September for the falls; year-round for the park',
    transport: 'SUV / Bus',
    priceFrom: 1799,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Coimbatore to Kovai Kutralam and Black Thunder',
        description:
          'Morning departure from Coimbatore, visit the waterfalls, followed by time at Black Thunder park before the return drive.',
        meals: 'Breakfast, Lunch',
      },
    ],
    inclusions: [
      'AC vehicle pickup and drop',
      'Driver and fuel charges',
      'Breakfast and lunch',
      'Assistance with park entry',
    ],
    exclusions: [
      'Black Thunder park entry and ride tickets',
      'Locker and towel rentals',
      'Personal expenses',
    ],
    highlights: [
      'Seasonal waterfalls',
      'Water rides and amusement park',
      'Good for families and larger groups',
    ],
  },
  {
    slug: 'gedee-car-museum',
    name: 'Gedee Car Museum',
    place: 'Coimbatore, Tamil Nadu',
    badge: 'Offbeat',
    heroImage: 'assets/geedee-car-museum.jpg',
    tagline: 'A vintage and classic car collection tucked inside Coimbatore.',
    overview:
      'A compact, well-curated stop for anyone interested in automobiles and design history. The Gedee Car Museum houses a private collection of vintage and classic cars along with memorabilia, and works well as a short add-on to a longer Coimbatore itinerary or as a relaxed half-day outing.',
    duration: 'Half Day',
    groupSize: '2 – 10 travelers',
    bestTime: 'Year-round',
    transport: 'SUV',
    priceFrom: 999,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Museum visit within Coimbatore',
        description:
          'Pickup from your hotel, guided walk through the museum galleries, and return drop-off.',
        meals: 'None',
      },
    ],
    inclusions: [
      'AC vehicle pickup and drop',
      'Driver and fuel charges',
      'Museum entry assistance',
    ],
    exclusions: [
      'Meals',
      'Museum entry ticket (paid at venue unless prepaid)',
      'Personal expenses',
    ],
    highlights: [
      'Rare vintage and classic automobiles',
      'Compact, easy add-on visit',
      'Good for a half-day plan',
    ],
  },
  {
    slug: 'aliyar-dam-monkey-falls',
    name: 'Aliyar Dam & Monkey Falls',
    place: 'Pollachi, Tamil Nadu',
    badge: 'Nature',
    heroImage: 'assets/aliyardam.jpg',
    tagline: 'Reservoir views and a forest waterfall on the Pollachi–Valparai road.',
    overview:
      'Aliyar Dam offers open reservoir views against the backdrop of the Anamalai hills, while nearby Monkey Falls is a shaded, easy-access waterfall popular for a quick dip. Together they make a relaxed nature day trip from Coimbatore, well suited to families and casual travelers.',
    duration: '1 Day',
    groupSize: '2 – 12 travelers',
    bestTime: 'August to January',
    transport: 'SUV / Bus',
    priceFrom: 1599,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Pollachi to Aliyar Dam and Monkey Falls',
        description:
          'Drive out to the Aliyar reservoir, spend time at the dam viewpoint, then continue to Monkey Falls before heading back.',
        meals: 'Breakfast, Lunch',
      },
    ],
    inclusions: [
      'AC vehicle pickup and drop',
      'Driver and fuel charges',
      'Breakfast and lunch',
      'Bottled drinking water',
    ],
    exclusions: [
      'Boating charges at the dam, if opted',
      'Personal expenses',
      'Tips and gratuities',
    ],
    highlights: [
      'Reservoir and hill views',
      'Shaded waterfall for a quick dip',
      'Easy, low-effort nature outing',
    ],
  },
  {
    slug: 'topslip-anamalai',
    name: 'Topslip, Anamalai',
    place: 'Pollachi, Tamil Nadu',
    badge: 'Wildlife',
    heroImage: 'assets/topslip.jpg',
    tagline: 'Forest safaris inside the Anamalai Tiger Reserve.',
    overview:
      'Topslip is the entry point to the Anamalai Tiger Reserve and one of the more accessible forest safari experiences in the state. Expect dense evergreen forest, a chance at sighting elephants, bison, and deer, and a noticeably cooler climate compared to the plains — best planned as a full-day or early-start trip.',
    duration: '1 Day',
    groupSize: '2 – 10 travelers',
    bestTime: 'November to April',
    transport: 'SUV',
    priceFrom: 2199,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Pollachi to Topslip forest safari',
        description:
          'Early departure from Pollachi, forest department safari inside the reserve, time at the eco point, then return in the afternoon.',
        meals: 'Breakfast, Lunch',
      },
    ],
    inclusions: [
      'AC vehicle pickup and drop from Pollachi',
      'Driver and fuel charges',
      'Assistance booking the forest safari',
      'Breakfast and lunch',
    ],
    exclusions: [
      'Forest department safari and entry fees',
      'Camera fees inside the reserve',
      'Personal expenses',
    ],
    highlights: [
      'Anamalai Tiger Reserve safari',
      'Evergreen forest scenery',
      'Chance of wildlife sightings',
    ],
  },
  {
    slug: 'ooty-coonoor',
    name: 'Ooty & Coonoor',
    place: 'The Nilgiris, Tamil Nadu',
    badge: 'Hill Station',
    heroImage: 'assets/ooty-coonor.jpg',
    tagline: 'Tea gardens, viewpoints, and the toy train route through the Nilgiris.',
    overview:
      'A classic Nilgiris getaway covering Ooty\'s lakes and gardens alongside Coonoor\'s tea estates and viewpoints. The route runs through pine forests, hairpin bends, and rolling tea slopes, and the pace is built for travelers who want a proper hill-station break rather than a rushed checklist of stops.',
    duration: '3 Days / 2 Nights',
    groupSize: '2 – 10 travelers',
    bestTime: 'October to June',
    transport: 'SUV / Bus',
    priceFrom: 8499,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Ooty local sightseeing',
        description:
          'Arrive in Ooty, check in, and cover Ooty Lake, the Government Botanical Garden, and Doddabetta Peak, the highest point in the Nilgiris.',
        meals: 'Breakfast, Dinner',
      },
      {
        day: 2,
        title: 'Coonoor tea trail',
        description:
          'Drive to Coonoor for Sim\'s Park and a working tea estate visit, with stops at Dolphin\'s Nose and Lamb\'s Rock viewpoints on the way.',
        meals: 'Breakfast, Dinner',
      },
      {
        day: 3,
        title: 'Local markets and departure',
        description:
          'Morning visit to Ooty\'s Charing Cross market for local produce and homemade chocolate, followed by check-out and drop-off.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'AC vehicle for the full itinerary',
      '2 nights hotel stay on double sharing',
      'Daily breakfast and dinner',
      'All sightseeing as per itinerary',
      'Driver allowance and toll charges',
    ],
    exclusions: [
      'Toy train tickets, if opted separately',
      'Entry tickets to gardens and viewpoints',
      'Lunch on all days',
      'Personal expenses and tips',
    ],
    highlights: [
      'Doddabetta Peak, the Nilgiris\' highest point',
      'Working tea estate visit in Coonoor',
      'Dolphin\'s Nose and Lamb\'s Rock viewpoints',
    ],
  },
  {
    slug: 'kodaikanal',
    name: 'Kodaikanal',
    place: 'Dindigul, Tamil Nadu',
    badge: 'Hill Station',
    heroImage: 'assets/kodaikanal.jpg',
    tagline: 'The Princess of Hill Stations — lakes, pine forests, and cool weather.',
    overview:
      'Kodaikanal\'s star-shaped lake, pine groves, and forested viewpoints make it one of Tamil Nadu\'s most-loved hill retreats. This package is built around a comfortable pace: boating on Kodai Lake, a drive to Coaker\'s Walk and Pillar Rocks, and time to simply enjoy the cooler climate.',
    duration: '3 Days / 2 Nights',
    groupSize: '2 – 10 travelers',
    bestTime: 'September to May',
    transport: 'SUV / Bus',
    priceFrom: 8999,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Kodai Lake',
        description:
          'Arrive and check in, then spend the evening at Kodaikanal Lake with boating and a walk along the promenade.',
        meals: 'Breakfast, Dinner',
      },
      {
        day: 2,
        title: 'Pillar Rocks and Coaker\'s Walk',
        description:
          'Full day covering Pillar Rocks, Coaker\'s Walk, Bryant Park, and Guna Caves viewpoint.',
        meals: 'Breakfast, Dinner',
      },
      {
        day: 3,
        title: 'Local sights and departure',
        description:
          'Visit Silver Cascade Falls on the way down, followed by check-out and return drop-off.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'AC vehicle for the full itinerary',
      '2 nights hotel stay on double sharing',
      'Daily breakfast and dinner',
      'All sightseeing as per itinerary',
    ],
    exclusions: [
      'Boating charges at Kodai Lake',
      'Entry tickets to Bryant Park and Guna Caves',
      'Lunch on all days',
      'Personal expenses',
    ],
    highlights: [
      'Boating on the star-shaped Kodai Lake',
      'Pillar Rocks and Coaker\'s Walk',
      'Silver Cascade Falls en route',
    ],
  },
  {
    slug: 'valparai',
    name: 'Valparai',
    place: 'Coimbatore, Tamil Nadu',
    badge: 'Offbeat',
    heroImage: 'assets/valparai.jpg',
    tagline: 'A quiet plateau of tea and coffee estates above 40 hairpin bends.',
    overview:
      'Valparai sits on a high plateau reached by a winding ghat road with forty numbered hairpin bends, and rewards the drive with sprawling tea estates, waterfalls, and a real chance of spotting wildlife along the road. It suits travelers looking for a calmer, less commercial hill destination.',
    duration: '2 Days / 1 Night',
    groupSize: '2 – 8 travelers',
    bestTime: 'November to April',
    transport: 'SUV',
    priceFrom: 6499,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Ghat road drive and estate views',
        description:
          'Drive up through the 40 hairpin bends, check in, and spend the evening at a tea estate viewpoint.',
        meals: 'Breakfast, Dinner',
      },
      {
        day: 2,
        title: 'Waterfalls and return',
        description:
          'Morning visit to Sholayar Dam and a nearby waterfall, then the descent back to Coimbatore.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'AC vehicle for the full itinerary',
      '1 night hotel stay on double sharing',
      'Breakfast and dinner',
      'Sightseeing as per itinerary',
    ],
    exclusions: [
      'Entry fees at Sholayar Dam, if applicable',
      'Lunch on both days',
      'Personal expenses',
    ],
    highlights: [
      'Forty hairpin-bend ghat drive',
      'Sprawling tea and coffee estates',
      'Chance of wildlife sightings en route',
    ],
  },
  {
    slug: 'yercaud',
    name: 'Yercaud',
    place: 'Salem, Tamil Nadu',
    badge: 'Hill Station',
    heroImage: 'assets/yercaud.jpg',
    tagline: 'A quieter alternative to Ooty, with coffee estates and a crater lake.',
    overview:
      'Yercaud in the Shevaroy Hills offers a gentler, less crowded hill-station experience centred on a natural lake, coffee and orange plantations, and a handful of easy viewpoints. It works well as a short break for travelers who don\'t want a long travel day.',
    duration: '2 Days / 1 Night',
    groupSize: '2 – 10 travelers',
    bestTime: 'October to June',
    transport: 'SUV / Bus',
    priceFrom: 5499,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Yercaud Lake and viewpoints',
        description:
          'Arrive and check in, then visit Yercaud Lake, Lady\'s Seat, and Pagoda Point.',
        meals: 'Breakfast, Dinner',
      },
      {
        day: 2,
        title: 'Coffee estates and departure',
        description:
          'Morning walk through a coffee estate followed by check-out and the return drive.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'AC vehicle for the full itinerary',
      '1 night hotel stay on double sharing',
      'Breakfast and dinner',
      'Sightseeing as per itinerary',
    ],
    exclusions: [
      'Boating charges at Yercaud Lake',
      'Lunch on both days',
      'Personal expenses',
    ],
    highlights: [
      'Natural crater lake',
      'Coffee and orange plantations',
      'Compact, easy weekend plan',
    ],
  },
  {
    slug: 'kolli-hills',
    name: 'Kolli Hills',
    place: 'Namakkal, Tamil Nadu',
    badge: 'Offbeat',
    heroImage: 'assets/kolli-hill.jpg',
    tagline: 'A remote hill range reached by 70 hairpin bends, with waterfalls and forest.',
    overview:
      'Kolli Hills remains one of Tamil Nadu\'s least commercial hill destinations, reached by a ghat road with seventy numbered bends. Expect thick forest, the Agaya Gangai waterfall, and a slower pace of travel suited to those who prefer offbeat routes over well-worn ones.',
    duration: '2 Days / 1 Night',
    groupSize: '2 – 8 travelers',
    bestTime: 'August to February',
    transport: 'SUV',
    priceFrom: 5999,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Ghat drive and Agaya Gangai Falls',
        description:
          'Drive up through the seventy hairpin bends, check in, and visit Agaya Gangai waterfall.',
        meals: 'Breakfast, Dinner',
      },
      {
        day: 2,
        title: 'Viewpoints and return',
        description:
          'Morning visit to a local viewpoint and the Arappaleeswarar Temple, followed by the drive back.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'AC vehicle for the full itinerary',
      '1 night hotel stay on double sharing',
      'Breakfast and dinner',
      'Sightseeing as per itinerary',
    ],
    exclusions: [
      'Lunch on both days',
      'Entry fees, if any',
      'Personal expenses',
    ],
    highlights: [
      'Seventy hairpin-bend ghat road',
      'Agaya Gangai waterfall',
      'Uncrowded, offbeat hill terrain',
    ],
  },
  {
    slug: 'yelagiri',
    name: 'Yelagiri',
    place: 'Vellore, Tamil Nadu',
    badge: 'Hill Station',
    heroImage: 'assets/yelagiri.jpg',
    tagline: 'A small, laid-back hill town known for its lake and rose gardens.',
    overview:
      'Yelagiri is a compact hill town built around Punganur Lake, with rose and orchid gardens, gentle trekking trails, and easy viewpoints. Its short distance from Chennai and Bengaluru makes it a practical option for a quick, low-effort hill break.',
    duration: '2 Days / 1 Night',
    groupSize: '2 – 10 travelers',
    bestTime: 'Year-round',
    transport: 'SUV / Bus',
    priceFrom: 4999,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Punganur Lake and gardens',
        description:
          'Arrive and check in, then visit Punganur Lake, the rose garden, and Nature Park.',
        meals: 'Breakfast, Dinner',
      },
      {
        day: 2,
        title: 'Viewpoint trek and departure',
        description:
          'Short morning trek to a nearby viewpoint, followed by check-out and return drop-off.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'AC vehicle for the full itinerary',
      '1 night hotel stay on double sharing',
      'Breakfast and dinner',
      'Sightseeing as per itinerary',
    ],
    exclusions: [
      'Boating charges at the lake',
      'Lunch on both days',
      'Personal expenses',
    ],
    highlights: [
      'Punganur Lake boating',
      'Rose and orchid gardens',
      'Easy day treks nearby',
    ],
  },
  {
    slug: 'madurai-meenakshi-amman-temple',
    name: 'Madurai Meenakshi Amman Temple',
    place: 'Madurai, Tamil Nadu',
    badge: 'Iconic',
    heroImage: 'assets/madurai-meenakshi-temple.jpg',
    tagline: 'One of Tamil Nadu\'s most iconic temples, with towering, sculpted gopurams.',
    overview:
      'The Meenakshi Amman Temple is among the most recognisable landmarks in South India, known for its towering, intricately sculpted gopurams and the Thousand Pillar Hall. This package covers a comfortable long-distance visit with a knowledgeable driver and enough time to take in the temple complex without feeling rushed.',
    duration: '1 Day',
    groupSize: '2 – 12 travelers',
    bestTime: 'October to March',
    transport: 'SUV / Bus',
    priceFrom: 2999,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Madurai temple visit',
        description:
          'Travel to Madurai, visit the Meenakshi Amman Temple complex and the Thousand Pillar Hall, with time for the surrounding market streets.',
        meals: 'Breakfast, Lunch',
      },
    ],
    inclusions: [
      'AC vehicle for long-distance travel',
      'Driver and fuel charges',
      'Breakfast and lunch',
      'Local route guidance around the temple',
    ],
    exclusions: [
      'Special darshan or camera tickets',
      'Any meal not mentioned in inclusions',
      'Personal expenses',
    ],
    highlights: [
      'Sculpted gopuram towers',
      'Thousand Pillar Hall',
      'Historic temple market streets',
    ],
  },
  {
    slug: 'rameswaram-ramanathaswamy-temple',
    name: 'Rameswaram Ramanathaswamy Temple',
    place: 'Ramanathapuram, Tamil Nadu',
    badge: 'Pilgrimage',
    heroImage: 'assets/rameswaram-temple.jpg',
    tagline: 'A coastal pilgrimage town famed for its temple corridors and the Pamban Bridge.',
    overview:
      'Rameswaram combines the Ramanathaswamy Temple, known for having the longest corridor among Hindu temples, with the dramatic sea crossing over the Pamban Bridge. This package allows time for temple rituals as well as the coastal points that make the town worth the longer drive.',
    duration: '2 Days / 1 Night',
    groupSize: '2 – 10 travelers',
    bestTime: 'October to April',
    transport: 'SUV / Bus',
    priceFrom: 6999,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Arrival and temple darshan',
        description:
          'Arrive in Rameswaram, check in, and visit the Ramanathaswamy Temple and its corridor.',
        meals: 'Breakfast, Dinner',
      },
      {
        day: 2,
        title: 'Pamban Bridge and Dhanushkodi',
        description:
          'Morning drive across Pamban Bridge to Dhanushkodi\'s ghost town and beach, before the return journey.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'AC vehicle for the full itinerary',
      '1 night hotel stay on double sharing',
      'Breakfast and dinner',
      'Sightseeing as per itinerary',
    ],
    exclusions: [
      'Special darshan tickets',
      'Lunch on both days',
      'Personal expenses',
    ],
    highlights: [
      'Longest temple corridor in India',
      'Pamban Bridge sea crossing',
      'Dhanushkodi ghost town and beach',
    ],
  },
  {
    slug: 'palani-murugan-temple',
    name: 'Palani Murugan Temple',
    place: 'Dindigul, Tamil Nadu',
    badge: 'Pilgrimage',
    heroImage: 'assets/palani-murugan-temple.jpg',
    tagline: 'A hilltop Murugan shrine reachable by winch railway or a scenic ropeway.',
    overview:
      'One of the six abodes of Lord Murugan, Palani Temple sits atop a rocky hill accessible by foot, winch railway, or ropeway. The package is built around a comfortable, unhurried darshan with transport handled end to end.',
    duration: '1 Day',
    groupSize: '2 – 12 travelers',
    bestTime: 'October to March',
    transport: 'SUV / Bus',
    priceFrom: 2499,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Palani temple visit',
        description:
          'Travel to Palani, ascend the temple hill by ropeway, complete darshan, and descend for the return journey.',
        meals: 'Breakfast, Lunch',
      },
    ],
    inclusions: [
      'AC vehicle for long-distance travel',
      'Driver and fuel charges',
      'Breakfast and lunch',
    ],
    exclusions: [
      'Ropeway or winch railway tickets',
      'Special darshan tickets',
      'Personal expenses',
    ],
    highlights: [
      'One of Murugan\'s six sacred abodes',
      'Scenic ropeway ascent',
      'Panoramic hilltop views',
    ],
  },
  {
    slug: 'tiruvannamalai-arunachaleswarar-temple',
    name: 'Tiruvannamalai Arunachaleswarar Temple',
    place: 'Tiruvannamalai, Tamil Nadu',
    badge: 'Pilgrimage',
    heroImage: 'assets/tiruvannamalai-temple.jpg',
    tagline: 'A vast temple complex at the base of the sacred Arunachala hill.',
    overview:
      'The Arunachaleswarar Temple is one of the largest temple complexes in India, set at the foot of Arunachala hill, a site closely associated with the Girivalam circumambulation walk. This package covers the temple visit with optional time for a shorter walk around the hill.',
    duration: '1 Day',
    groupSize: '2 – 12 travelers',
    bestTime: 'October to March',
    transport: 'SUV / Bus',
    priceFrom: 2299,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Temple visit and Arunachala hill',
        description:
          'Travel to Tiruvannamalai, visit the Arunachaleswarar Temple complex, with optional time near the base of Arunachala hill.',
        meals: 'Breakfast, Lunch',
      },
    ],
    inclusions: [
      'AC vehicle for long-distance travel',
      'Driver and fuel charges',
      'Breakfast and lunch',
    ],
    exclusions: [
      'Special darshan tickets',
      'Personal expenses',
      'Tips and gratuities',
    ],
    highlights: [
      'One of India\'s largest temple complexes',
      'Sacred Arunachala hill',
      'Girivalam circumambulation route',
    ],
  },
  {
    slug: 'kanchipuram-temples',
    name: 'Kanchipuram Temples',
    place: 'Kanchipuram, Tamil Nadu',
    badge: 'Heritage',
    heroImage: 'assets/kanchipuram-temples.jpg',
    tagline: 'The city of a thousand temples, and home to Kanchipuram silk weaving.',
    overview:
      'Kanchipuram\'s temple architecture spans several dynasties, and this package covers a curated selection including the Ekambareswarar, Kailasanathar, and Kamakshi Amman temples, along with time to browse the town\'s well-known silk weaving lanes.',
    duration: '1 Day',
    groupSize: '2 – 12 travelers',
    bestTime: 'October to March',
    transport: 'SUV / Bus',
    priceFrom: 2199,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Kanchipuram temple circuit',
        description:
          'Visit the Ekambareswarar, Kailasanathar, and Kamakshi Amman temples, followed by time at a silk-weaving showroom.',
        meals: 'Breakfast, Lunch',
      },
    ],
    inclusions: [
      'AC vehicle for the full itinerary',
      'Driver and fuel charges',
      'Breakfast and lunch',
    ],
    exclusions: [
      'Temple entry or camera fees',
      'Silk sari purchases',
      'Personal expenses',
    ],
    highlights: [
      'Ekambareswarar and Kailasanathar temples',
      'Dravidian and Pallava-era architecture',
      'Kanchipuram silk weaving lanes',
    ],
  },
  {
    slug: 'thanjavur-brihadeeswarar-temple',
    name: 'Thanjavur Brihadeeswarar Temple',
    place: 'Thanjavur, Tamil Nadu',
    badge: 'Heritage',
    heroImage: 'assets/thanjavur-temple.jpg',
    tagline: 'A UNESCO World Heritage Chola-era temple with a towering granite vimana.',
    overview:
      'Built by Raja Raja Chola I, the Brihadeeswarar Temple is a landmark of Chola architecture and a UNESCO World Heritage Site, known for its towering granite vimana and detailed stone carving. The package also allows time for the Thanjavur Palace and its royal art collection.',
    duration: '2 Days / 1 Night',
    groupSize: '2 – 10 travelers',
    bestTime: 'October to March',
    transport: 'SUV / Bus',
    priceFrom: 6499,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Brihadeeswarar Temple',
        description:
          'Arrive in Thanjavur, check in, and spend the afternoon at the Brihadeeswarar Temple complex.',
        meals: 'Breakfast, Dinner',
      },
      {
        day: 2,
        title: 'Thanjavur Palace and departure',
        description:
          'Morning visit to Thanjavur Palace and its art gallery, followed by check-out and the return drive.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'AC vehicle for the full itinerary',
      '1 night hotel stay on double sharing',
      'Breakfast and dinner',
      'Sightseeing as per itinerary',
    ],
    exclusions: [
      'Palace and art gallery entry tickets',
      'Lunch on both days',
      'Personal expenses',
    ],
    highlights: [
      'UNESCO World Heritage Chola temple',
      'Towering granite vimana',
      'Thanjavur Palace art collection',
    ],
  },
  {
    slug: 'hogenakkal-falls',
    name: 'Hogenakkal Falls',
    place: 'Dharmapuri, Tamil Nadu',
    badge: 'Nature',
    heroImage: 'assets/hogenakkal-falls.jpg',
    tagline: 'The "Niagara of India" — coracle rides on the Kaveri river.',
    overview:
      'Hogenakkal Falls is known for its dramatic rock formations and traditional coracle boat rides on the Kaveri river, close to the waterfall itself. It\'s a straightforward day trip that pairs well with a relaxed lunch by the river.',
    duration: '1 Day',
    groupSize: '2 – 12 travelers',
    bestTime: 'August to February',
    transport: 'SUV / Bus',
    priceFrom: 1899,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Hogenakkal Falls and coracle ride',
        description:
          'Drive to Hogenakkal, take a coracle ride near the falls, and enjoy time by the riverbank before the return journey.',
        meals: 'Breakfast, Lunch',
      },
    ],
    inclusions: [
      'AC vehicle pickup and drop',
      'Driver and fuel charges',
      'Breakfast and lunch',
    ],
    exclusions: [
      'Coracle ride charges',
      'Fish market purchases, if opted',
      'Personal expenses',
    ],
    highlights: [
      'Traditional coracle boat ride',
      'Kaveri river rock formations',
      'Riverside dining options',
    ],
  },
  {
    slug: 'courtallam-falls',
    name: 'Courtallam Falls',
    place: 'Tenkasi, Tamil Nadu',
    badge: 'Seasonal',
    heroImage: 'assets/courtallam-falls.jpg',
    tagline: 'The "Spa of South India" — a cluster of therapeutic waterfalls.',
    overview:
      'Courtallam is known for a cluster of waterfalls believed to have therapeutic mineral properties, drawing large crowds during the monsoon season. This package is timed around the falls\' peak flow and includes stops at the Main Falls and a couple of the quieter, smaller falls nearby.',
    duration: '2 Days / 1 Night',
    groupSize: '2 – 10 travelers',
    bestTime: 'June to September',
    transport: 'SUV / Bus',
    priceFrom: 5999,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Main Falls and town',
        description:
          'Arrive in Courtallam, check in, and spend the afternoon and evening at the Main Falls.',
        meals: 'Breakfast, Dinner',
      },
      {
        day: 2,
        title: 'Smaller falls and departure',
        description:
          'Visit one or two of the smaller, quieter falls in the area before the return journey.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'AC vehicle for the full itinerary',
      '1 night hotel stay on double sharing',
      'Breakfast and dinner',
      'Sightseeing as per itinerary',
    ],
    exclusions: [
      'Falls entry and locker charges',
      'Lunch on both days',
      'Personal expenses',
    ],
    highlights: [
      'Mineral-rich therapeutic waterfalls',
      'Monsoon-season peak flow',
      'Multiple falls within the area',
    ],
  },
  {
    slug: 'kanyakumari',
    name: 'Kanyakumari',
    place: 'Kanyakumari, Tamil Nadu',
    badge: 'Iconic',
    heroImage: 'assets/kanyakumari.jpg',
    tagline: 'India\'s southernmost tip, where three seas meet.',
    overview:
      'Kanyakumari sits at the confluence of the Arabian Sea, Bay of Bengal, and Indian Ocean, and is best known for its sunrise and sunset views, the Vivekananda Rock Memorial, and the Thiruvalluvar Statue. This package is timed to catch at least one of the two signature views.',
    duration: '2 Days / 1 Night',
    groupSize: '2 – 10 travelers',
    bestTime: 'October to March',
    transport: 'SUV / Bus',
    priceFrom: 6999,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Arrival and sunset point',
        description:
          'Arrive in Kanyakumari, check in, and head to the shore for sunset before dinner.',
        meals: 'Breakfast, Dinner',
      },
      {
        day: 2,
        title: 'Vivekananda Rock Memorial and departure',
        description:
          'Early ferry to the Vivekananda Rock Memorial and Thiruvalluvar Statue, followed by check-out and the return drive.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'AC vehicle for the full itinerary',
      '1 night hotel stay on double sharing',
      'Breakfast and dinner',
      'Sightseeing as per itinerary',
    ],
    exclusions: [
      'Ferry tickets to the Rock Memorial',
      'Lunch on both days',
      'Personal expenses',
    ],
    highlights: [
      'Sunrise and sunset over three seas',
      'Vivekananda Rock Memorial',
      'Thiruvalluvar Statue',
    ],
  },
  {
    slug: 'mahabalipuram',
    name: 'Mahabalipuram',
    place: 'Chengalpattu, Tamil Nadu',
    badge: 'Heritage',
    heroImage: 'assets/mahabalipuram.jpg',
    tagline: 'A UNESCO World Heritage coastal town of rock-cut shore temples.',
    overview:
      'Mahabalipuram\'s Shore Temple, Pancha Rathas, and Arjuna\'s Penance are landmark examples of 7th-century Pallava rock-cut architecture, set close to the Bay of Bengal coastline. The package covers the main heritage sites with time to walk along the beach.',
    duration: '1 Day',
    groupSize: '2 – 12 travelers',
    bestTime: 'November to February',
    transport: 'SUV / Bus',
    priceFrom: 2499,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Mahabalipuram heritage circuit',
        description:
          'Visit the Shore Temple, Pancha Rathas, and Arjuna\'s Penance, with time on the beach before the return drive.',
        meals: 'Breakfast, Lunch',
      },
    ],
    inclusions: [
      'AC vehicle for the full itinerary',
      'Driver and fuel charges',
      'Breakfast and lunch',
    ],
    exclusions: [
      'Monument entry tickets',
      'Personal expenses',
      'Tips and gratuities',
    ],
    highlights: [
      'UNESCO World Heritage rock-cut monuments',
      'Shore Temple by the coastline',
      'Pancha Rathas and Arjuna\'s Penance',
    ],
  },
  {
    slug: 'karaikudi-chettinad',
    name: 'Karaikudi / Chettinad',
    place: 'Sivaganga, Tamil Nadu',
    badge: 'Heritage',
    heroImage: 'assets/karaikudi-chettinad.jpg',
    tagline: 'Grand mansions, tiled courtyards, and the flavours of Chettinad cuisine.',
    overview:
      'The Chettinad region around Karaikudi is known for its large, ornately tiled merchant mansions, antique markets, and a cuisine that has become synonymous with the region\'s name. This package covers a mansion visit, a walk through the antique lanes, and a proper Chettinad meal.',
    duration: '2 Days / 1 Night',
    groupSize: '2 – 10 travelers',
    bestTime: 'October to March',
    transport: 'SUV / Bus',
    priceFrom: 6299,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Chettinad mansions',
        description:
          'Arrive in Karaikudi, check in, and visit one of the region\'s heritage mansions along with the antique market.',
        meals: 'Breakfast, Dinner',
      },
      {
        day: 2,
        title: 'Local villages and departure',
        description:
          'Morning visit to a nearby Chettinad village known for tile-making or weaving, followed by check-out.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'AC vehicle for the full itinerary',
      '1 night hotel stay on double sharing',
      'Breakfast and dinner',
      'Sightseeing as per itinerary',
    ],
    exclusions: [
      'Mansion entry fees, where applicable',
      'Lunch on both days',
      'Personal expenses',
    ],
    highlights: [
      'Grand Chettinad heritage mansions',
      'Antique and tile-making markets',
      'Authentic Chettinad cuisine',
    ],
  },
  {
    slug: 'pichavaram-mangrove-forest',
    name: 'Pichavaram Mangrove Forest',
    place: 'Cuddalore, Tamil Nadu',
    badge: 'Nature',
    heroImage: 'assets/pichavaram-mangrove-forest.jpg',
    tagline: 'One of the world\'s largest mangrove forests, explored by boat.',
    overview:
      'Pichavaram is a dense network of mangrove waterways best experienced by boat, with narrow channels weaving between the roots that make the forest one of its kind in the region. It\'s a calm, photogenic day trip suited to nature-focused travelers.',
    duration: '1 Day',
    groupSize: '2 – 10 travelers',
    bestTime: 'November to February',
    transport: 'SUV / Bus',
    priceFrom: 2199,
    priceUnit: 'per person',
    itinerary: [
      {
        day: 1,
        title: 'Mangrove boat ride',
        description:
          'Drive to Pichavaram, take a boat ride through the mangrove channels, then return by evening.',
        meals: 'Breakfast, Lunch',
      },
    ],
    inclusions: [
      'AC vehicle pickup and drop',
      'Driver and fuel charges',
      'Breakfast and lunch',
    ],
    exclusions: [
      'Boat ride charges',
      'Personal expenses',
      'Tips and gratuities',
    ],
    highlights: [
      'One of the world\'s largest mangrove forests',
      'Boat rides through narrow water channels',
      'Quiet, scenic photography spots',
    ],
  },
];

export function getPackageBySlug(slug: string): TourPackage | undefined {
  return PACKAGES.find((pkg) => pkg.slug === slug);
}