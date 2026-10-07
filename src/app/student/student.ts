import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';


// ============================================================
// Interfaces
// ============================================================

interface WhyCard {
  icon: string;
  title: string;
  description: string;
}

interface HeroHighlight {
  icon: string;
  label: string;
}

interface FloatingBadge {
  icon: string;
  label: string;
  meta: string;
}

interface VehicleOption {
  id: string;
  name: string;
  /** Path to the vehicle photo — swap in your own fleet photography */
  image: string;
  popular: boolean;
  seating: string;
  ac: string;
  luggage: string;
  driverOption: string;
}

interface TravelSolution {
  icon: 'industrial' | 'educational' | 'events' | 'department' | 'academic' | 'group';
  title: string;
  description: string;
}


interface PackageItem {
  id: string;
  tag: string;
  icon: string;
  title: string;
  description: string;
  includes: string[];
}


interface ProcessStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

// ============================================================
// Component
// ============================================================

@Component({
  selector: 'app-student-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student.html',
  styleUrls: ['./student.scss']
})
export class StudentHeroComponent
  implements AfterViewInit, OnDestroy {

  constructor(private readonly hostEl: ElementRef<HTMLElement>) {}

  // ============================================================
  // WhatsApp
  // ============================================================

  private readonly whatsappNumber = '918508088851';


  // ============================================================
  // Background Image Slider
  // ============================================================

  readonly slides: string[] = [
    'assets/simage1.jpg',
    'assets/simage2.jpg',
    'assets/simage3.jpg'
  ];

  readonly activeSlide = signal(0);

  private slideTimer: ReturnType<typeof setInterval> | null = null;

  private readonly slideIntervalMs = 5000;


  // ============================================================
  // Hero Highlights
  // ============================================================

  readonly highlights: HeroHighlight[] = [
    {
      icon: 'bi-piggy-bank-fill',
      label: 'Student-Friendly Pricing'
    },
    {
      icon: 'bi-sliders',
      label: 'Flexible Packages'
    },
    {
      icon: 'bi-shield-check',
      label: 'Safe Transportation'
    },
    {
      icon: 'bi-people-fill',
      label: 'Group Travel'
    }
  ];


  // ============================================================
  // Why Students Choose AKT
  // ============================================================

  readonly whyCards: WhyCard[] = [
    {
      icon: 'budget',
      title: 'Budget Friendly',
      description:
        'Travel solutions designed to keep group transportation affordable.'
    },
    {
      icon: 'shield',
      title: 'Safe & Reliable',
      description:
        'Well-maintained vehicles with experienced drivers.'
    },
    {
      icon: 'group',
      title: 'Group Travel',
      description:
        'Suitable vehicles for small and large student groups.'
    },
    {
      icon: 'flexible',
      title: 'Flexible Trips',
      description:
        'Choose one-day, multi-day, local, or outstation travel packages.'
    }
  ];


  // ============================================================
  // Trip Preview
  // ============================================================

  readonly tripPreview = {
    from: 'College Campus',
    to: 'Trip Destination',
    vehicle: 'Tempo Traveller',
    eta: '25 min'
  };


  // ============================================================
  // Floating Badges
  // ============================================================

  readonly floatingBadges: FloatingBadge[] = [
    {
      icon: 'bi-patch-check-fill',
      label: 'Group Confirmed',
      meta: '42 Students'
    },
    {
      icon: 'bi-clock-history',
      label: 'On Schedule',
      meta: 'Live status'
    }
  ];


  // ============================================================
  // Vehicle Options
  // ============================================================

  readonly vehicles: VehicleOption[] = [
    {
      id: 'suv',
      name: 'MUV / SUV',
      image: 'assets/fimage1.jpg',
      popular: false,
      seating: '7 Seater',
      ac: 'AC',
      luggage: '4 Bags',
      driverOption: 'Driver Included'
    },
    {
      id: 'tempo',
      name: 'Tempo Traveller',
      image: 'assets/fimage4.png',
      popular: false,
      seating: '12–17 Seater',
      ac: 'AC',
      luggage: '8 Bags',
      driverOption: 'Driver Included'
    },
    {
      id: 'minibus',
      name: 'Mini Bus',
      image: 'assets/fimage5.jpg',
      popular: true,
      seating: '20–32 Seater',
      ac: 'AC',
      luggage: '15 Bags',
      driverOption: 'Driver Included'
    },
    {
      id: 'bus',
      name: 'Bus',
      image: 'assets/fimage6.png',
      popular: false,
      seating: '40+ Seater',
      ac: 'AC',
      luggage: '25 Bags',
      driverOption: 'Driver Included'
    }
  ];


  // ============================================================
  // Travel Solutions
  // ============================================================

  readonly solutions: TravelSolution[] = [
    {
      icon: 'industrial',
      title: 'Industrial Visits',
      description: 'Comfortable transportation for college industrial visits and company tours.'
    },
    {
      icon: 'educational',
      title: 'Educational Tours',
      description: 'Reliable vehicles for educational trips and study tours.'
    },
    {
      icon: 'events',
      title: 'College Events',
      description: 'Transportation for symposiums, culturals, sports events, and competitions.'
    },
    {
      icon: 'department',
      title: 'Department Trips',
      description: 'Customized travel plans for department-level student outings.'
    },
    {
      icon: 'academic',
      title: 'Project & Academic Travel',
      description: 'Transportation for field visits, surveys, academic projects, and research trips.'
    },
    {
      icon: 'group',
      title: 'Student Group Tours',
      description: 'Affordable packages for friends, clubs, and student organizations.'
    }
  ];


  // ============================================================
  // Packages
  // ============================================================

  readonly packages: PackageItem[] = [
    {
      id: 'local-one-day',
      tag: 'Day Trip',
      icon: 'bi-geo-alt-fill',
      title: 'Local One-Day Trip',
      description: 'Ideal for nearby educational visits and college outings.',
      includes: ['Vehicle', 'Driver', 'Local travel', 'Flexible timing']
    },
    {
      id: 'outstation-trip',
      tag: 'Multi-City',
      icon: 'bi-signpost-split-fill',
      title: 'Outstation Trip',
      description: 'Designed for multi-city educational and recreational trips.',
      includes: ['Vehicle', 'Driver', 'Outstation travel', 'Multiple-day option']
    },
    {
      id: 'college-group',
      tag: 'Group Package',
      icon: 'bi-people-fill',
      title: 'College Group Package',
      description: 'Customized transportation for larger student groups.',
      includes: ['Multiple vehicles', 'Coordinated pickup points', 'Group travel planning', 'Dedicated support']
    }
  ];


  // ============================================================
  // Process Steps (booking journey)
  // ============================================================

  readonly steps: ProcessStep[] = [
    {
      number: '01',
      icon: 'bi-chat-square-text-fill',
      title: 'Tell Us Your Trip',
      description: 'Destination, date, students count, pickup location.'
    },
    {
      number: '02',
      icon: 'bi-car-front-fill',
      title: 'Choose Your Vehicle',
      description: 'Select a vehicle based on your group size and budget.'
    },
    {
      number: '03',
      icon: 'bi-receipt',
      title: 'Get Your Quote',
      description: 'Receive a customized travel package.'
    },
    {
      number: '04',
      icon: 'bi-emoji-smile-fill',
      title: 'Enjoy Your Trip',
      description: 'Travel comfortably with AKT Travels.'
    }
  ];

  // Drives the process section's horizontal road fill — one quarter per stop reached.
  readonly progress = signal(0);

  private stopObserver: IntersectionObserver | null = null;
  private readonly activeStops = new Set<number>();


  // ============================================================
  // WhatsApp - Plan Student Trip
  // ============================================================

  planStudentTrip(): void {
    const message = encodeURIComponent(
      'Hi AKT Travels, I would like to plan a student trip. ' +
      'Please share your available vehicles and pricing.'
    );
    this.openWhatsApp(message);
  }


  // ============================================================
  // WhatsApp - Get Group Quote
  // ============================================================

  getGroupQuote(): void {
    const message = encodeURIComponent(
      'Hi AKT Travels, we are a student group and would like a quote for group travel.'
    );
    this.openWhatsApp(message);
  }


  // ============================================================
  // WhatsApp - Enquire About a Specific Vehicle
  // ============================================================

  enquireVehicle(vehicle: VehicleOption): void {
    const message = encodeURIComponent(
      `Hi AKT Travels, I would like to enquire about the ${vehicle.name} ` +
      `(${vehicle.seating}) for a student trip.`
    );
    this.openWhatsApp(message);
  }


  // ============================================================
  // WhatsApp - Enquire About a Package
  // ============================================================

  enquireAboutPackage(pkg: PackageItem): void {
    const message = encodeURIComponent(
      `Hi AKT Travels, I'd like to know more about the *${pkg.title}* package for our college/student group.`
    );
    this.openWhatsApp(message);
  }


  // ============================================================
  // Open WhatsApp
  // ============================================================

  private openWhatsApp(message: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.open(
      `https://wa.me/${this.whatsappNumber}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  }


  // ============================================================
  // Background Slider + Scroll-reveal + Process Progress
  // ============================================================

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && this.slides.length > 1) {
      this.slideTimer = setInterval(() => {
        this.activeSlide.update(current => (current + 1) % this.slides.length);
      }, this.slideIntervalMs);
    }

    // -------- Generic scroll-reveal --------
    const revealTargets = this.hostEl.nativeElement.querySelectorAll<HTMLElement>('[data-reveal]');

    if (prefersReducedMotion) {
      revealTargets.forEach((node) => node.classList.add('is-visible'));
    } else {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              this.observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
      );

      revealTargets.forEach((node) => this.observer?.observe(node));
    }

    // -------- "Process" step reveal + horizontal road progress --------
    // Separate observer: watches [data-stop-index] elements (distinct
    // from the generic [data-reveal] targets above) and drives the
    // `progress` signal for the road-fill animation.
    const stopEls = this.hostEl.nativeElement.querySelectorAll<HTMLElement>('[data-stop-index]');

    if (prefersReducedMotion) {
      stopEls.forEach((node) => node.classList.add('is-visible'));
      this.progress.set(100);
      return;
    }

    this.stopObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-stop-index'));
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.activeStops.add(index);
            this.stopObserver?.unobserve(entry.target);
            this.progress.set((this.activeStops.size / this.steps.length) * 100);
          }
        });
      },
      { threshold: 0.35, rootMargin: '0px -10% 0px 0px' }
    );

    stopEls.forEach((node) => this.stopObserver?.observe(node));
  }


  // ============================================================
  // Change Slide Manually
  // ============================================================

  setActiveSlide(index: number): void {
    if (index < 0 || index >= this.slides.length) {
      return;
    }

    this.activeSlide.set(index);
  }


  // ============================================================
  // Next Slide
  // ============================================================

  nextSlide(): void {
    if (this.slides.length <= 1) {
      return;
    }

    this.activeSlide.update(current => (current + 1) % this.slides.length);
  }


  // ============================================================
  // Previous Slide
  // ============================================================

  previousSlide(): void {
    if (this.slides.length <= 1) {
      return;
    }

    this.activeSlide.update(
      current => (current - 1 + this.slides.length) % this.slides.length
    );
  }


  // ============================================================
  // Cleanup
  // ============================================================

  private observer: IntersectionObserver | null = null;

  ngOnDestroy(): void {
    if (this.slideTimer !== null) {
      clearInterval(this.slideTimer);
      this.slideTimer = null;
    }

    this.observer?.disconnect();
    this.stopObserver?.disconnect();
  }
}