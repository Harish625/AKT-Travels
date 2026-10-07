import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

// ---------------- Hero types ----------------
export interface HeroSlide {
  image: string;
  alt: string;
  label: string;
  title: string;
  description: string;
  primaryButton: string;
  secondaryButton?: string;
}

// ---------------- About Us types ----------------
interface FleetChip {
  label: string;
}

interface StatItem {
  value: string;
  label: string;
}

// ---------------- What We Offer types ----------------
interface OfferItem {
  icon: string; // Bootstrap Icons class, e.g. 'bi-clock-history'
  image: string;
  title: string;
  description: string;
  route?: string;
}

// ---------------- Quick Comparison (Vehicle Options) types ----------------
interface VehicleOption {
  type: string;
  capacity: string;
  bestFor: string;
  availableIn: string;
  icon: string; // Bootstrap Icons class, e.g. 'bi-car-front-fill'
}

// ---------------- Our Fleet types ----------------
interface FleetFeature {
  icon: string;   // Bootstrap Icons class
  label: string;
}

interface FleetVehicle {
  id: string;
  image: string;        // add manually — real fleet photo
  title: string;
  description: string;
  features: FleetFeature[];
  badge?: string;        // optional ribbon, e.g. 'Most Popular'
}

// ---------------- Reviews types ----------------
interface FeaturedReview {
  name: string;
  location: string;
  trip: string;
  rating: number;
  text: string;
  avatar: string;
  image: string;
  date: string;
}

//------------------FAQ------------------------//
interface FaqItem {
  question: string;
  answer: string;
}


//-------------------REVIEW--------------------//
export interface Review {
  id: number;
  name: string;
  location: string;
  serviceUsed: string;
  rating: number;
  reviewText: string;
  date: string; // ISO string
}

export interface TravelMemory {
  id: string;
  src: string;
  alt: string;
  kind: 'photo' | 'video';
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  // Styling for the Hero + About Us + Offers + Quick Comparison + Fleet +
  // Reviews sections lives in the GLOBAL stylesheet (hero.scss /
  // about-us.scss / offers.scss / comparison.scss / fleet.scss /
  // reviews.scss), not a component-scoped file — see the "how to wire
  // this up" notes at the bottom of about-us.scss.
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private readonly router: Router) {}

  private readonly whatsappNumber = '919876543210';


  // =========================================================
  // HERO SECTION
  // =========================================================
  private readonly slideIntervalMs = 6000;
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
  private isPaused = false;

  readonly activeIndex = signal(0);

  prefersReducedMotion = false;

  slides: HeroSlide[] = [
    {
      image: 'assets/image1.png',
      alt: 'Snow-capped European mountain range at golden hour',
      label: 'EXPLORE THE WORLD',
      title: 'Your Dream Journey Starts Here',
      description: 'Discover beautiful destinations, thoughtfully planned itineraries and unforgettable experiences with AKT Travel.',
      primaryButton: 'Explore Packages',
      secondaryButton: 'Plan My Trip'
    },
    {
      image: 'assets/image2.jpeg',
      alt: 'Turquoise tropical beach at sunset with calm waters',
      label: 'ESCAPE • RELAX • ENJOY',
      title: 'Leave the Stress Behind',
      description: 'Relax in beautiful destinations while we take care of the planning, bookings and travel details.',
      primaryButton: 'Explore Holidays',
      secondaryButton: 'View Packages'
    },
    {
      image: 'assets/image3.png',
      alt: 'Romantic luxury resort overlooking the mountains at dusk',
      label: 'TRAVEL COLLECTION',
      title: 'Make Every Journey Unforgettable',
      description: 'Explore stunning destinations, exciting experiences, and carefully planned tour packages designed to make every trip comfortable, memorable, and hassle-free.',
      primaryButton: 'Explore Honeymoon',
      secondaryButton: 'Plan Your Trip'
    },
    {
      image: 'assets/image4.jpg',
      alt: 'Misty green hills of a scenic Indian hill station',
      label: 'DISCOVER TamilNadu',
      title: 'Beautiful Places. Beautiful Memories.',
      description: "Explore India's most beautiful destinations with comfortable stays, seamless travel and thoughtfully designed packages.",
      primaryButton: 'Explore India',
      secondaryButton: 'View Packages'
    }
  ];

  trustStats = [
    { icon: 'bi-people-fill', label: '500+ Happy Travellers' },
    { icon: 'bi-geo-alt-fill', label: '100+ Destinations' },
    { icon: 'bi-map-fill', label: 'Personalized Trips' },
    { icon: 'bi-headset', label: '24/7 Travel Support' }
  ];

  ngOnInit(): void {
    this.prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.loadReviews();
    this.startAutoplay();
    this.startReviewAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
    this.stopReviewAutoplay();
  }

  startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.slideIntervalMs);
  }

  stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  next(): void {
    this.activeIndex.update(i => (i + 1) % this.slides.length);
  }

  prev(): void {
    this.activeIndex.update(i => (i - 1 + this.slides.length) % this.slides.length);
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
  }

  trackBySlide(index: number, slide: HeroSlide): string {
    return slide.title;
  }

  // =========================================================
  // ABOUT US SECTION
  // =========================================================

  readonly fleet: FleetChip[] = [
    { label: 'SUVs' },
    { label: 'Tempo Traveller' },
    { label: 'Force Urbania' },
    { label: '45-Seater AC Bus' }
  ];

  readonly stats: StatItem[] = [
    { value: '15+', label: 'Years on the Road' },
    { value: '3', label: 'States Covered' },
    { value: '500+', label: 'Happy Journeys' }
  ];

  readonly images = {
    main: 'assets/aimage2.jpg',
    secondaryTop: 'assets/aimage1.png',
    secondaryBottom: 'assets/aimage3.jpg'
  };

  // =========================================================
  // WHAT WE OFFER SECTION
  // =========================================================

  readonly offers: OfferItem[] = [
    {
      icon: 'bi-clock-history',
      title: 'Daily Rentals',
      description:
        'Book by the day for errands, meetings or short local trips — pay only for the time you actually use.',
      image: 'assets/cimage1.png'
    },
    {
      icon: 'bi-heart-fill',
      title: 'Wedding & Marriage Rentals',
      description:
        'From baraat to reception, dependable cars and buses for every function on the big day.',
      image: 'assets/cimage2.png'
    },
    {
      icon: 'bi-bank',
      title: 'Pilgrimage Tour Rentals',
      description:
        'Comfortable, unhurried journeys to temples and pilgrimage sites, planned around your schedule.',
      image: 'assets/cimage3.png'
    },
    {
      icon: 'bi-shield-check',
      title: 'PSV Permit Rentals',
      description:
        'Fully permitted vehicles for interstate and long-distance travel — no paperwork headaches at the border.',
      image: 'assets/cimage4.png'
    },
    {
      icon: 'bi-briefcase-fill',
      title: 'Corporate Rentals',
      description:
        'Reliable transport for offices, client visits and corporate events, with GST-compliant billing.',
      image: 'assets/cimage5.png',
      route: '/corporate-rental'
    },
    {
      icon: 'bi-signpost-split-fill',
      title: 'Outstation Tour Rentals',
      description:
        'Multi-day trips across South India with a driver who already knows the routes and the rest stops.',
      image: 'assets/cimage6.png'
    }
  ];

  // =========================================================
  // QUICK COMPARISON SECTION (Vehicle Options & Best Use)
  // =========================================================

  readonly vehicleComparisons: VehicleOption[] = [
    {
      type: 'Sedan (Etios / Dzire)',
      capacity: '4 Seater',
      bestFor: 'Airport transfer, local trips, couple outstation',
      availableIn: 'Coimbatore, Trichy, Dindigul',
      icon: 'bi-car-front-fill'
    },
    {
      type: 'SUV (Innova / Ertiga)',
      capacity: '7 Seater',
      bestFor: 'Family trips, outstation, hill stations',
      availableIn: 'Coimbatore, Trichy, Dindigul',
      icon: 'bi-truck-front-fill'
    },
    {
      type: 'Tempo Traveller',
      capacity: '12–20 Seater',
      bestFor: 'Group tours, pilgrimages, college trips',
      availableIn: 'Coimbatore, Trichy, Dindigul',
      icon: 'bi-bus-front-fill'
    },
    {
      type: 'Force Urbania',
      capacity: '17 Seater',
      bestFor: 'Luxury travel, corporate, VIP',
      availableIn: 'Coimbatore, Dindigul',
      icon: 'bi-bus-front'
    },
    {
      type: 'Mini Bus',
      capacity: '20–28 Seater',
      bestFor: 'Weddings, events, medium groups',
      availableIn: 'Coimbatore, Trichy, Dindigul',
      icon: 'bi-bus-front-fill'
    },
    {
      type: 'Large Bus (AC/Non-AC)',
      capacity: '35–56 Seater',
      bestFor: 'Marriage functions, factory trips, pilgrimages',
      availableIn: 'Coimbatore, Trichy, Dindigul',
      icon: 'bi-bus-front-fill'
    }
  ];

  // =========================================================
  // OUR FLEET SECTION
  // =========================================================


  readonly fleetVehicles: FleetVehicle[] = [
    {
      id: '4-seater-sedan',
      image: 'assets/fimage1.jpg',
      title: '4 Seater Sedan',
      description: 'Comfortable and fuel-efficient — ideal for airport runs and local trips.',
      features: [
        { icon: 'bi-person-fill', label: '4 Seater' },
        { icon: 'bi-snow', label: 'AC' },
        { icon: 'bi-bag-fill', label: '2 Bags' }
      ]
    },
    {
      id: '7-seater-suv',
      image: 'assets/fimage2.jpg',
      title: '7 Seater SUV',
      description: 'Spacious and sturdy — built for family trips and hill-station outstation runs.',
      features: [
        { icon: 'bi-person-fill', label: '7 Seater' },
        { icon: 'bi-snow', label: 'AC' },
        { icon: 'bi-bag-fill', label: '4 Bags' }
      ],
      badge: 'Most Popular'
    },
    {
      id: '14-seater-tempo-traveller-ac',
      image: 'assets/fimage3.jpg',
      title: '14 Seater Tempo Traveller AC',
      description: 'Pushback seating and cool comfort — perfect for group tours and college trips.',
      features: [
        { icon: 'bi-people-fill', label: '14 Seater' },
        { icon: 'bi-snow', label: 'AC' },
        { icon: 'bi-recycle', label: 'Pushback Seats' }
      ]
    },
    {
      id: '18-seater-tempo-traveller',
      image: 'assets/fimage4.png',
      title: '18 Seater Tempo Traveller',
      description: 'Extra room for bigger groups without losing comfort on long routes.',
      features: [
        { icon: 'bi-people-fill', label: '18 Seater' },
        { icon: 'bi-snow', label: 'AC' },
        { icon: 'bi-lightbulb-fill', label: 'Reading Lights' }
      ]
    },
    {
      id: 'force-urbania-luxury',
      image: 'assets/fimage5.jpg',
      title: 'Force Urbania (Luxury)',
      description: 'Premium interiors and a smooth ride — built for corporate and VIP travel.',
      features: [
        { icon: 'bi-people-fill', label: '17 Seater' },
        { icon: 'bi-snow', label: 'AC' },
        { icon: 'bi-gem', label: 'Premium Interior' }
      ],
      badge: 'Luxury'
    },
    {
      id: '25-seater-bus',
      image: 'assets/fimage6.jpg',
      title: '25 Seater Bus / Large Bus',
      description: 'Reliable, roomy travel for weddings, events and factory or pilgrimage groups.',
      features: [
        { icon: 'bi-people-fill', label: '25+ Seater' },
        { icon: 'bi-snow', label: 'AC / Non-AC' },
        { icon: 'bi-music-note-beamed', label: 'Music System' }
      ]
    }
  ];

  openVehicleDetails(vehicle: FleetVehicle): void {
    this.router.navigate(['/fleet', vehicle.id]);
  }

  bookOnWhatsApp(vehicle: FleetVehicle): void {
    const message = encodeURIComponent(
      `Hi AKT Travels, I'd like to book the *${vehicle.title}*. Please share availability and details.`
    );
    window.open(`https://wa.me/${this.whatsappNumber}?text=${message}`, '_blank', 'noopener');
  }

  navigateToOffer(route?: string): void {
    if (route) {
      this.router.navigateByUrl(route);
    }
  }

  // =========================================================
  // TRAVELER REVIEWS SECTION
  // =========================================================

  readonly reviewStars = [1, 2, 3, 4, 5];

  readonly featuredReviews: FeaturedReview[] = [
    {
      name: 'Priya Ramesh',
      location: 'Chennai',
      trip: 'Ooty Hill Station Tour',
      rating: 5,
      text: 'AKT Travels planned every single detail of our Ooty trip — from the tea estate route to the homestay. Genuinely the smoothest family trip we\'ve had in years.',
      avatar: 'https://i.pravatar.cc/150?img=47',
      image: 'assets/limage1.png',
      date: 'Jul 2026'
    },
    {
      name: 'Arjun Kumar',
      location: 'Bengaluru',
      trip: 'Kodaikanal Weekend Getaway',
      rating: 5,
      text: 'Driver was punctual, itinerary was well paced, no rushing around. Loved the local food stops they added on the way.',
      avatar: 'https://i.pravatar.cc/150?img=12',
      image: 'assets/cimage3.png',
      date: 'Jun 2026'
    },
    {
      name: 'Meena Suresh',
      location: 'Coimbatore',
      trip: 'Munnar Tea Trail',
      rating: 4,
      text: 'Beautiful stays and a well-organized route through the tea estates. Would book again for our next trip.',
      avatar: 'https://i.pravatar.cc/150?img=32',
      image: 'assets/image1.png',
      date: 'May 2026'
    },
    {
      name: 'Vikram Das',
      location: 'Madurai',
      trip: 'Wayanad Wildlife Trip',
      rating: 5,
      text: 'Booked last minute and they still managed a perfect plan. Great communication throughout the trip.',
      avatar: 'https://i.pravatar.cc/150?img=51',
      image: 'assets/image2.jpeg',
      date: 'Apr 2026'
    },
    {
      name: 'Divya Nair',
      location: 'Salem',
      trip: 'Yercaud Family Trip',
      rating: 5,
      text: 'Kids loved the boat house stay. Everything was pre-arranged, we didn\'t have to worry about a thing.',
      avatar: 'https://i.pravatar.cc/150?img=25',
      image: 'assets/image4.jpg',
      date: 'Mar 2026'
    },
    {
      name: 'Karthik Iyer',
      location: 'Trichy',
      trip: 'Coonoor Botanical Trail',
      rating: 5,
      text: 'Clean vehicle, courteous driver, and a route that avoided all the usual traffic snarls. Highly recommend for a quiet weekend trip.',
      avatar: 'https://i.pravatar.cc/150?img=15',
      image: 'assets/image3.png',
      date: 'Feb 2026'
    }
  ];

  get featuredReview(): FeaturedReview {
    return this.featuredReviews[0];
  }

  get otherReviews(): FeaturedReview[] {
    return this.featuredReviews.slice(1);
  }

//====================FAQ==================//
 
  readonly faqs: FaqItem[] = [
    {
      question: 'What types of vehicles does AKT Travels offer?',
      answer:
        'SUVs (Innova Crysta, Ertiga), Tempo Travellers (12–20 seater), Force Urbania (17 seater luxury van), and Buses (20–56 seater AC/Non-AC). All vehicles come with experienced drivers.'
    },
    {
      question: 'How is the pricing calculated?',
      answer:
        'Pricing is per-KM plus driver bata. Toll and parking are extra. SUVs start around ₹14/km, Tempo Travellers from ₹18/km, and buses from ₹30/km — we confirm exact rates before booking.'
    },
    {
      question: 'Do you provide buses for weddings?',
      answer:
        'Yes — 20 to 56 seater AC buses for marriage functions, reception transport, and multi-city wedding travel. Book early during wedding season (Nov–Feb).'
    },
    {
      question: 'How do I book a vehicle?',
      answer:
        "Call or WhatsApp us with your date, destination, group size and vehicle preference — we'll share a quote within 30 minutes."
    },
    {
      question: 'How early should I book for hill stations?',
      answer:
        '24–48 hours for regular trips. For peak season (Apr–Jun hills, Oct–Jan weddings) book 1–2 weeks ahead; large buses (35+ seater) 1 week ahead.'
    }
  ];

  

  /** Index of the currently open accordion item, or null if all are closed. */
  readonly openIndex = signal<number | null>(0);

  toggle(index: number): void {
    this.openIndex.update(current => (current === index ? null : index));
  }

  isOpen(index: number): boolean {
    return this.openIndex() === index;
  }

  chatOnWhatsApp(): void {
    const message = encodeURIComponent(
      "Hi AKT Travels, I have a question that wasn't covered in your FAQ."
    );
    window.open(`https://wa.me/${this.whatsappNumber}?text=${message}`, '_blank', 'noopener');
  }

  callNow(): void {
    window.location.href = 'tel:+919876543210';
  }


// --- Class Properties ---
private STORAGE_KEY = 'akt_travels_reviews';
private reviewAutoplayTimer: ReturnType<typeof setInterval> | null = null;
private isReviewPaused = false;

currentIndex = 0;
reviews: Review[] = [];

private defaultReviews: Review[] = [
  {
    id: 1,
    name: 'Arun K.',
    location: 'Ooty',
    serviceUsed: 'SUV Rental',
    rating: 5,
    reviewText: 'Driver knew every stop-worthy spot between Coimbatore and Ooty. Not something an app gives you.',
    date: '2026-08-10T10:00:00.000Z'
  },
  {
    id: 2,
    name: 'Priya S.',
    location: 'Ooty',
    serviceUsed: 'Tempo Traveller',
    rating: 5,
    reviewText: 'Booked for a family trip to Coonoor. Clean vehicle, on-time pickup, and the driver was super patient with our kids.',
    date: '2026-08-05T10:00:00.000Z'
  },
  {
    id: 3,
    name: 'Mohammed R.',
    location: 'Coimbatore',
    serviceUsed: 'Car Rental',
    rating: 4,
    reviewText: 'Smooth outstation booking process. Pricing was transparent with no last minute surprises.',
    date: '2026-07-28T10:00:00.000Z'
  },
  {
    id: 4,
    name: 'Divya M.',
    location: 'Ooty',
    serviceUsed: 'Airport Drop',
    rating: 5,
    reviewText: 'Early morning airport drop from Ooty, driver arrived 10 minutes before time. Very reliable service.',
    date: '2026-07-20T10:00:00.000Z'
  }
];

// --- Review Methods ---
private loadReviews(): void {
  try {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const savedReviews: Review[] = stored ? JSON.parse(stored) : [];
    const merged = [...this.defaultReviews, ...savedReviews];
    this.reviews = this.sortReviews(merged);
  } catch {
    this.reviews = this.sortReviews(this.defaultReviews);
  }
}

private sortReviews(reviews: Review[]): Review[] {
  return [...reviews].sort((a, b) => {
    const aToday = this.isToday(a.date);
    const bToday = this.isToday(b.date);
    if (aToday !== bToday) return aToday ? -1 : 1;

    if (b.rating !== a.rating) return b.rating - a.rating;

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

private isToday(dateStr: string): boolean {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

// --- Review autoplay controls ---
startReviewAutoplay(): void {
  this.stopReviewAutoplay();
  this.reviewAutoplayTimer = setInterval(() => {
    if (!this.isReviewPaused) this.nextReview();
  }, 4000);
}

stopReviewAutoplay(): void {
  if (this.reviewAutoplayTimer) clearInterval(this.reviewAutoplayTimer);
  this.reviewAutoplayTimer = null;
}

pauseReviewAutoplay(): void {
  this.isReviewPaused = true;
}

resumeReviewAutoplay(): void {
  this.isReviewPaused = false;
}

// --- Review carousel navigation ---
nextReview(): void {
  if (!this.reviews.length) return;
  this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
}

prevReview(): void {
  if (!this.reviews.length) return;
  this.currentIndex =
    (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
}

goToReview(index: number): void {
  this.currentIndex = index;
}

getOffset(i: number): number {
  const total = this.reviews.length;
  let offset = i - this.currentIndex;

  if (offset > total / 2) {
    offset -= total;
  }
  if (offset < -total / 2) {
    offset += total;
  }

  return offset;
}

getCardStyle(i: number): { [key: string]: string } {
  const offset = this.getOffset(i);
  const clamped = Math.max(-2, Math.min(2, offset));

  return {
    transform: `translateX(calc(-50% + ${clamped * 340}px)) scale(${offset === 0 ? 1 : 0.85})`,
    opacity: Math.abs(offset) > 2 ? '0' : (offset === 0 ? '1' : '0.55'),
    zIndex: String(100 - Math.abs(offset)),
    pointerEvents: offset === 0 ? 'auto' : 'none'
  };
}

stars(rating: number): number[] {
  return Array(5).fill(0).map((_, i) => i);
}

/** Recent trips destination page. Kept configurable for routing changes. */
  @Input() tripsRoute = '/recent-trips';
 
  /**
   * Collage memories. Defaults to realistic mock data so the section works
   * standalone; pass real data once the trips API is wired up.
   * Expected order: [primary photo, secondary photo, video thumbnail].
   */
  @Input() memories: TravelMemory[] = [
    {
      id: 'primary',
      src: 'assets/ooty-coonor.jpg',
      alt: 'Scenic Ooty and Coonoor mountain route',
      kind: 'photo',
    },
    {
      id: 'secondary',
      src: 'assets/valparai.jpg',
      alt: 'Green mountain road through Valparai',
      kind: 'photo',
    },
    {
      id: 'video',
      src: 'assets/yercaud.jpg',
      alt: 'Yercaud hill-station landscape from a recent trip',
      kind: 'video',
    },
  ];
 
  /** Fires when the video thumbnail is activated, so a parent can open a lightbox or navigate. */
  @Output() watchVideo = new EventEmitter<TravelMemory>();
 
  get primary(): TravelMemory | undefined {
    return this.memories[0];
  }
 
  get secondary(): TravelMemory | undefined {
    return this.memories[1];
  }
 
  get video(): TravelMemory | undefined {
    return this.memories.find((m) => m.kind === 'video') ?? this.memories[2];
  }
 
  onVideoActivate(memory?: TravelMemory): void {
    if (memory) {
      this.watchVideo.emit(memory);
    }
  }

}