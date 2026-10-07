import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Highlight {
  icon: string;
  label: string;
}

interface FloatingBadge {
  icon: string;
  label: string;
  meta: string;
}

interface FeatureCard {
  number: string;
  icon: string;
  title: string;
  description: string;
}

interface SolutionRow {
  icon: string;
  service: string;
  description: string;
}

interface FleetVehicle {
  id: string;
  title: string;
  image: string;
  badge?: string;
  seating: string;
  ac: string;
  luggage: string;
  driverOption: string;
}

interface PlanItem {
  icon: string;
  title: string;
  description: string;
  featured?: boolean;
  badge?: string;
}

interface HowStep {
  number: string;
  title: string;
  description: string;
}

interface BenefitItem {
  id: string;
  icon: string;
  title: string;
  detail: string;
}

@Component({
  selector: 'app-corporate-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './corporate-rental.html'
  // Styling lives in the GLOBAL stylesheet (corporate-hero.scss),
  // not a component-scoped file — same pattern as hero.scss / about-us.scss
  // on the home page.
})
export class CorporateHeroComponent implements AfterViewInit, OnDestroy {
  private readonly whatsappNumber = '918508088851';
  private observer: IntersectionObserver | null = null;
  private stepObserver: IntersectionObserver | null = null;
  private readonly activeSteps = new Set<number>();

  // Drives the "How It Works" timeline's fill line: 0–100, one quarter per completed step.
  readonly howItWorksProgress = signal(0);

  // Which benefit card is expanded to show its "detail" line. null = none.
  readonly expandedId = signal<string | null>(null);

  constructor(private readonly hostEl: ElementRef<HTMLElement>) {}

  // -------- Hero section data --------
  readonly highlights: Highlight[] = [
    { icon: 'bi-person-badge-fill', label: 'Professional Drivers' },
    { icon: 'bi-sliders', label: 'Flexible Rental Plans' },
    { icon: 'bi-clock-history', label: 'On-Time Service' },
    { icon: 'bi-headset', label: 'Dedicated Support' }
  ];

  // Sample data for the signature "live trip" dashboard card.
  readonly tripPreview = {
    from: 'Coimbatore HQ',
    to: 'Client Site',
    vehicle: 'Executive SUV',
    eta: '18 min'
  };

  readonly floatingBadges: FloatingBadge[] = [
    { icon: 'bi-patch-check-fill', label: 'Verified Driver', meta: 'Assigned' },
    { icon: 'bi-clock-history', label: 'On Schedule', meta: 'Live status' }
  ];

  // -------- "Why Choose Us" section data --------
  readonly cards: FeatureCard[] = [
    {
      number: '01',
      icon: 'bi-people-fill',
      title: 'Employee Transportation',
      description: 'Daily pick-up and drop services for employees with planned routes and schedules.'
    },
    {
      number: '02',
      icon: 'bi-briefcase-fill',
      title: 'Business Meetings & Visits',
      description: 'Comfortable transportation for executives, clients, partners, and visiting teams.'
    },
    {
      number: '03',
      icon: 'bi-calendar-event-fill',
      title: 'Corporate Events',
      description: 'Transportation management for conferences, seminars, team outings, and company events.'
    },
    {
      number: '04',
      icon: 'bi-arrow-repeat',
      title: 'Long-Term Rentals',
      description: 'Flexible monthly and long-term rental options for organizations with ongoing transportation needs.'
    }
  ];

  // -------- "Corporate Solutions" section data --------
  readonly solutions: SolutionRow[] = [
    {
      icon: 'bi-people-fill',
      service: 'Employee Transport',
      description: 'Scheduled transportation for staff'
    },
    {
      icon: 'bi-airplane-fill',
      service: 'Airport Transfers',
      description: 'Airport pick-up & drop for employees and guests'
    },
    {
      icon: 'bi-gem',
      service: 'Executive Travel',
      description: 'Premium vehicles for senior management'
    },
    {
      icon: 'bi-briefcase-fill',
      service: 'Client Transportation',
      description: 'Professional travel arrangements for clients'
    },
    {
      icon: 'bi-calendar2-event-fill',
      service: 'Corporate Events',
      description: 'Group transportation for events'
    },
    {
      icon: 'bi-signpost-split-fill',
      service: 'Outstation Business Trips',
      description: 'Reliable intercity travel'
    }
  ];

  // -------- "Fleet" section data --------
  // NOTE: image paths reuse the existing fleet photography from the
  // home page as placeholders — swap in dedicated corporate fleet
  // photos when available.
  readonly vehicles: FleetVehicle[] = [
    {
      id: 'sedan',
      title: 'Sedan',
      image: 'assets/fimage1.jpg',
      seating: '4 Seater',
      ac: 'AC',
      luggage: '2 Bags',
      driverOption: 'Driver Included'
    },
    {
      id: 'suv',
      title: 'SUV',
      image: 'assets/fimage2.jpg',
      badge: 'Most Popular',
      seating: '7 Seater',
      ac: 'AC',
      luggage: '4 Bags',
      driverOption: 'Driver Included'
    },
    {
      id: 'muv',
      title: 'MUV',
      image: 'assets/fimage4.png',
      seating: '8 Seater',
      ac: 'AC',
      luggage: '5 Bags',
      driverOption: 'Driver Included'
    },
    {
      id: 'tempo-traveller',
      title: 'Tempo Traveller',
      image: 'assets/fimage3.jpg',
      seating: '12–17 Seater',
      ac: 'AC',
      luggage: 'Large Capacity',
      driverOption: 'Driver Included'
    },
    {
      id: 'mini-bus',
      title: 'Mini Bus',
      image: 'assets/fimage6.jpg',
      seating: '20–28 Seater',
      ac: 'AC / Non-AC',
      luggage: 'Large Capacity',
      driverOption: 'Driver Included'
    },
    {
      id: 'luxury-premium',
      title: 'Luxury / Premium Vehicles',
      image: 'assets/fimage5.jpg',
      badge: 'Premium Pick',
      seating: '4–7 Seater',
      ac: 'AC',
      luggage: 'Premium Interior',
      driverOption: 'Chauffeur Included'
    }
  ];

  // -------- "Plans" section data --------
  readonly plans: PlanItem[] = [
    {
      icon: 'bi-calendar-day',
      title: 'Daily Rental',
      description: 'For short-term business requirements.'
    },
    {
      icon: 'bi-calendar-week',
      title: 'Weekly Rental',
      description: 'Ideal for projects, training programs, and temporary assignments.'
    },
    {
      icon: 'bi-calendar3',
      title: 'Monthly Rental',
      description: 'For companies requiring regular transportation.'
    },
    {
      icon: 'bi-file-earmark-text-fill',
      title: 'Custom Corporate Contract',
      description: 'Tailored plans based on employee count, routes, vehicle requirements, and travel frequency.',
      featured: true,
      badge: 'Fully Tailored'
    }
  ];

  // -------- "How It Works" section data --------
  readonly steps: HowStep[] = [
    {
      number: '01',
      title: 'Share Your Requirement',
      description: 'Tell us your routes, travel dates, number of passengers, and vehicle requirements.'
    },
    {
      number: '02',
      title: 'Get a Custom Plan',
      description: 'Our team prepares a rental solution based on your business needs.'
    },
    {
      number: '03',
      title: 'Confirm Your Booking',
      description: 'Choose your preferred vehicle and rental plan.'
    },
    {
      number: '04',
      title: 'Travel With Confidence',
      description: 'Our professional team handles the transportation while you focus on your business.'
    }
  ];

  // -------- "Benefits" section data --------
  readonly benefits: BenefitItem[] = [
    {
      id: 'ontime',
      icon: 'bi-clock-history',
      title: 'On-Time Pickup & Drop',
      detail: 'GPS-tracked scheduling keeps every trip on time, every time.'
    },
    {
      id: 'chauffeurs',
      icon: 'bi-person-badge-fill',
      title: 'Professional Chauffeurs',
      detail: 'Trained, verified drivers who represent your business well.'
    },
    {
      id: 'vehicles',
      icon: 'bi-car-front-fill',
      title: 'Well-Maintained Vehicles',
      detail: 'Regular servicing and inspection for a safe, comfortable ride.'
    },
    {
      id: 'flexible',
      icon: 'bi-calendar2-range-fill',
      title: 'Flexible Rental Duration',
      detail: 'Daily, weekly, monthly, or a fully custom term — you decide.'
    },
    {
      id: 'categories',
      icon: 'bi-grid-3x3-gap-fill',
      title: 'Multiple Vehicle Categories',
      detail: 'From sedans to mini-buses, matched to your headcount.'
    },
    {
      id: 'support',
      icon: 'bi-headset',
      title: 'Dedicated Customer Support',
      detail: 'One point of contact for bookings, changes, and queries.'
    },
    {
      id: 'pricing',
      icon: 'bi-receipt',
      title: 'Transparent Pricing',
      detail: 'Clear, itemized quotes upfront — no hidden charges later.'
    },
    {
      id: 'custom-plans',
      icon: 'bi-map-fill',
      title: 'Customized Travel Plans',
      detail: 'Routes and schedules designed around your operations.'
    }
  ];

  // -------- Hero actions --------
  requestCorporateQuote(): void {
    const message = encodeURIComponent(
      'Hi AKT Travels, we would like to request a corporate travel quote. ' +
      'Please share your available plans and vehicle options.'
    );
    window.open(`https://wa.me/${this.whatsappNumber}?text=${message}`, '_blank', 'noopener');
  }

  talkToTravelTeam(): void {
    window.location.href = 'tel:+918508088851';
  }

  // -------- Fleet actions --------
  enquireAboutVehicle(vehicle: FleetVehicle): void {
    const message = encodeURIComponent(
      `Hi AKT Travels, I'd like more details about the *${vehicle.title}* for corporate use.`
    );
    window.open(`https://wa.me/${this.whatsappNumber}?text=${message}`, '_blank', 'noopener');
  }

  // -------- Plans actions --------
  enquireAboutPlan(plan: PlanItem): void {
    const message = encodeURIComponent(
      `Hi AKT Travels, I'd like to know more about the *${plan.title}* plan for our business.`
    );
    window.open(`https://wa.me/${this.whatsappNumber}?text=${message}`, '_blank', 'noopener');
  }

  // -------- Benefits actions --------
  toggleBenefit(id: string): void {
    this.expandedId.set(this.expandedId() === id ? null : id);
  }

  contactSales(): void {
    const message = encodeURIComponent(
      'Hi AKT Travels, I went through your corporate benefits and would like to discuss a plan for our business.'
    );
    window.open(`https://wa.me/${this.whatsappNumber}?text=${message}`, '_blank', 'noopener');
  }

  // -------- Scroll-reveal (respects prefers-reduced-motion) --------
  // Watches generic [data-reveal] elements (hero, why-choose, solutions,
  // fleet, plans, benefits cards).
  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      revealTargets.forEach((node) => this.observer?.observe(node));
    }

    // -------- "How It Works" step reveal + progress tracking --------
    const stepEls = this.hostEl.nativeElement.querySelectorAll<HTMLElement>('[data-step-index]');

    if (prefersReducedMotion) {
      stepEls.forEach((node) => node.classList.add('is-visible'));
      this.howItWorksProgress.set(100);
      return;
    }

    this.stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-step-index'));
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.activeSteps.add(index);
            this.stepObserver?.unobserve(entry.target);
            this.howItWorksProgress.set((this.activeSteps.size / this.steps.length) * 100);
          }
        });
      },
      { threshold: 0.4, rootMargin: '0px 0px -15% 0px' }
    );

    stepEls.forEach((node) => this.stepObserver?.observe(node));

    // -------- "Benefits" card reveal --------
    // Reuses the generic [data-reveal] targets/observer above — benefit
    // cards use the same attribute, so no separate observer is needed.
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.stepObserver?.disconnect();
  }
}