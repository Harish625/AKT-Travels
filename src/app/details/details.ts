import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

export interface Vehicle {
  id: string;
  name: string;
  shortLabel: string;   // used in the top pill selector
  type: string;
  description: string;
  image: string;
  gallery: string[];
  seats: string;
  ac: string;
  luggage: string;
  fuelType: string;
  transmission: string;
  driver: string;
  minimumBooking: string;
  overview: string;
  features: string[];
  suitableFor: string[];
}

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  
})
export class VehicleDetailsComponent implements OnInit {
  readonly vehicles: Vehicle[] = [
    {
      id: '4-seater-sedan',
      name: '4 Seater Sedan',
      shortLabel: '4 Seater Sedan',
      type: 'Sedan',
      description:
        'A comfortable, fuel-efficient sedan built for smooth city rides, airport transfers and short outstation trips.',
      image: 'assets/fimage1.jpg',
      gallery: [
        'assets/dimage41.jpg',
        'assets/dimage42.jpg',
        'assets/dimage43.jpg'
      ],
      seats: '4 Passengers',
      ac: 'Available',
      luggage: '2 Bags',
      fuelType: 'Petrol / Diesel',
      transmission: 'Manual / Automatic',
      driver: 'Driver Available',
      minimumBooking: '1 Day',
      overview:
        'The 4 Seater Sedan is our most versatile everyday vehicle, chosen for its comfortable ride quality and easy maneuverability through city traffic. It suits solo travellers, couples and small families who need a dependable, well-maintained car for quick point-to-point journeys. With a clean cabin and a courteous driver, it makes airport runs, client meetings and short outstation drives simple and stress-free.',
      features: [
        'Comfortable Seats',
        'Air Conditioned',
        'Clean, Well-Maintained Cabin',
        'Good Luggage Space',
        'Smooth City & Highway Ride',
        'Experienced Driver',
        'Ideal for Short Outstation Trips',
        'Easy Airport Pickup & Drop'
      ],
      suitableFor: [
        'Couple Trips',
        'Small Family Travel',
        'Airport Transfers',
        'Business Travel',
        'City Travel',
        'Short Outstation Trips'
      ]
    },
    {
      id: '7-seater-suv',
      name: '7 Seater SUV',
      shortLabel: '7 Seater SUV',
      type: 'SUV / MUV',
      description:
        'A spacious and sturdy SUV designed for family trips, hill-station getaways and comfortable outstation travel.',
      image: 'assets/fimage2.jpg',
      gallery: [
        'assets/dimage72.jpg',
        'assets/dimage71.jpg',
        'assets/dimage73.jpg'
      ],
      seats: '7 Passengers',
      ac: 'Available',
      luggage: '4 Bags',
      fuelType: 'Diesel',
      transmission: 'Manual',
      driver: 'Driver Available',
      minimumBooking: '1 Day',
      overview:
        'The 7 Seater SUV combines cabin space with a confident ride, making it a favourite for family outings and hill-station tours. Higher ground clearance and a stable chassis handle winding ghat roads comfortably, while the extra seating keeps larger families and small groups together on one trip. It is equally suited to weekend getaways and longer multi-day outstation journeys.',
      features: [
        'Comfortable Seats',
        'Air Conditioned',
        'Spacious Cabin',
        'Good Luggage Space',
        'Well Maintained',
        'Experienced Driver',
        'Comfortable Long-Distance Travel',
        'Suitable for Hill Station Routes'
      ],
      suitableFor: [
        'Family Trips',
        'Hill Station Tours',
        'Outstation Travel',
        'Airport Transfers',
        'Weekend Trips',
        'Small Group Travel'
      ]
    },
    {
      id: '14-seater-tempo-traveller-ac',
      name: '14 Seater Tempo Traveller AC',
      shortLabel: '14 Seater Tempo Traveller AC',
      type: 'Tempo Traveller',
      description:
        'A well-appointed AC tempo traveller with pushback seating, ideal for group tours and pilgrimage journeys.',
      image: 'assets/fimage3.jpg',
      gallery: [
        'assets/dimaget3.jpg',
        'assets/dimaget1.png',
        'assets/dimaget2.png'
      ],
      seats: '14 Passengers',
      ac: 'Available',
      luggage: '10+ Bags',
      fuelType: 'Diesel',
      transmission: 'Manual',
      driver: 'Driver Available',
      minimumBooking: '1 Day',
      overview:
        'Built for group travel, the 14 Seater Tempo Traveller AC offers pushback seating, ample headroom and a cool, comfortable cabin for longer journeys. It is a popular choice for pilgrimage trips, college outings and family group tours where everyone needs to travel together without splitting into multiple cars. The generous luggage area comfortably fits bags for extended, multi-day trips.',
      features: [
        'Pushback Seats',
        'Air Conditioned',
        'Spacious Cabin',
        'Ample Luggage Space',
        'Well Maintained',
        'Experienced Driver',
        'Comfortable for Long-Distance Travel',
        'Suitable for Group & Pilgrimage Tours'
      ],
      suitableFor: [
        'Family Group Tours',
        'Pilgrimage Trips',
        'Hill Station Tours',
        'Long-Distance Travel',
        'Corporate Outings',
        'Group Vacations'
      ]
    },
    {
      id: '18-seater-tempo-traveller',
      name: '18 Seater Tempo Traveller',
      shortLabel: '18 Seater Tempo Traveller',
      type: 'Tempo Traveller',
      description:
        'A roomy tempo traveller that comfortably seats larger groups without compromising on travel comfort.',
      image: 'assets/dimaget3.jpg',
      gallery: [
        'assets/dimaget1.png',
        'assets/dimaget2.png',
        'assets/dimaget3.jpg'
      ],
      seats: '18 Passengers',
      ac: 'Available (Non-AC Optional)',
      luggage: '12+ Bags',
      fuelType: 'Diesel',
      transmission: 'Manual',
      driver: 'Driver Available',
      minimumBooking: '1 Day',
      overview:
        'The 18 Seater Tempo Traveller extends the comfort of our smaller tempo travellers to bigger groups, with additional legroom and reading lights for evening travel. It works well for college trips, corporate outings and larger pilgrimage groups that need everyone on a single, well-organised vehicle. Reinforced seating and a stable ride make it dependable across longer outstation routes.',
      features: [
        'Reading Lights',
        'Air Conditioned',
        'Extra Legroom',
        'Good Luggage Space',
        'Well Maintained',
        'Experienced Driver',
        'Comfortable Long-Distance Travel',
        'Suitable for Larger Group Tours'
      ],
      suitableFor: [
        'Large Family Trips',
        'College Trips',
        'Corporate Outings',
        'Pilgrimage Tours',
        'Group Tours',
        'Outstation Journeys'
      ]
    },
    {
      id: 'force-urbania-luxury',
      name: 'Force Urbania – Luxury',
      shortLabel: 'Force Urbania',
      type: 'Luxury Van',
      description:
        'A premium luxury van with plush interiors, crafted for corporate travel, VIP transfers and special occasions.',
      image: 'assets/fimage5.jpg',
      gallery: [
        'assets/dimageu3.jpg',
        'assets/dimageu2.jpg',
        'assets/dimageu1.jpg'
      ],
      seats: '17 Passengers',
      ac: 'Premium AC',
      luggage: '10+ Bags',
      fuelType: 'Diesel',
      transmission: 'Manual',
      driver: 'Professional Driver Available',
      minimumBooking: '1 Day',
      overview:
        'The Force Urbania is our luxury travel option, finished with premium upholstery, plush seating and a refined cabin experience. It is chosen for corporate movements, VIP guest transfers and wedding-related travel where presentation and comfort matter as much as capacity. A professional, well-groomed driver rounds out the premium experience from pickup to drop.',
      features: [
        'Premium Interior',
        'Plush Seating',
        'Air Conditioned',
        'Spacious Cabin',
        'Well Maintained',
        'Professional Driver',
        'Comfortable Long-Distance Travel',
        'Suitable for VIP & Corporate Travel'
      ],
      suitableFor: [
        'Premium Family Travel',
        'Luxury Outstation Trips',
        'Corporate Travel',
        'VIP Travel',
        'Wedding Transportation',
        'Premium Group Tours'
      ]
    },
    {
      id: '25-seater-bus',
      name: '25 Seater Bus / Large Bus',
      shortLabel: '25 Seater Bus',
      type: 'Bus / Large Bus',
      description:
        'A reliable, spacious bus built for large groups — weddings, pilgrimages, college trips and corporate events.',
      image: 'assets/fimage6.jpg',
      gallery: [
        'assets/dimage1.jpg',
        'assets/dimage2.jpg',
        'assets/dimage3.jpg'
      ],
      seats: '25+ Passengers',
      ac: 'AC / Non-AC Options',
      luggage: 'Large Capacity',
      fuelType: 'Diesel',
      transmission: 'Manual',
      driver: 'Professional Driver Available',
      minimumBooking: '1 Day',
      overview:
        'Our 25 Seater Bus / Large Bus is built for scale — moving entire wedding parties, school groups or factory teams together on one comfortable vehicle. A large luggage hold, sturdy seating and an experienced driver make it dependable for both short local runs and long-distance pilgrimage or outstation tours. It is a practical choice whenever a big group needs to travel as one.',
      features: [
        'Spacious Seating',
        'AC / Non-AC Options',
        'Large Luggage Capacity',
        'Music System',
        'Well Maintained',
        'Experienced Driver',
        'Comfortable Long-Distance Travel',
        'Suitable for Large Group Movement'
      ],
      suitableFor: [
        'School / College Trips',
        'Large Group Tours',
        'Corporate Events',
        'Pilgrimage Tours',
        'Wedding Functions',
        'Large Family Gatherings'
      ]
    }
  ];

  selectedVehicle: Vehicle = this.vehicles[0];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const match = this.vehicles.find(v => v.id === id);
      this.selectedVehicle = match ?? this.vehicles[0];
    });
  }

  /** Switches the displayed vehicle and keeps the URL in sync (shareable link). */
  selectVehicle(vehicle: Vehicle): void {
    if (vehicle.id === this.selectedVehicle.id) {
      return;
    }
    this.selectedVehicle = vehicle;
    this.router.navigate(['/fleet', vehicle.id]);
  }

  goBack(): void {
    this.location.back();
  }

  trackByVehicleId(_index: number, vehicle: Vehicle): string {
    return vehicle.id;
  }
}