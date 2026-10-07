import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href: string;
  linkText?: string;
}

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-plan-journey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  
})
export class PlanJourneyComponent {
  // ---- static config -------------------------------------------------
  readonly whatsappNumber = '919876543210'; // replace with real number, digits only, country code first
  readonly callNumber = '+91 98765 43210';
  readonly emailAddress = 'pgp23101999@gmail.com';
  readonly mapsUrl = 'https://maps.google.com/?q=AKT+Travels+Coimbatore';

  contactInfo: ContactInfo[] = [
    {
      icon: 'bx bx-phone-call',
      label: 'Call Us',
      value: '+91 98765 43210',
      href: 'tel:+919876543210'
    },
    {
      icon: 'bx bxl-whatsapp',
      label: 'WhatsApp',
      value: '+91 98765 43210',
      href: 'https://wa.me/919876543210'
    },
    {
      icon: 'bx bx-envelope',
      label: 'Email Us',
      value: 'info@akttravels.in',
      href: 'mailto:info@akttravels.in'
    },
    {
      icon: 'bx bx-map',
      label: 'Office Location',
      value: 'Coimbatore, Tamil Nadu',
      href: 'https://maps.google.com/?q=AKT+Travels+Coimbatore',
      linkText: 'View Map'
    }
  ];

  travelTypes: SelectOption[] = [
    { value: 'local', label: 'Local / Daily Rental' },
    { value: 'outstation', label: 'Outstation Tour' },
    { value: 'airport', label: 'Airport Transfer' },
    { value: 'wedding', label: 'Wedding & Marriage' },
    { value: 'pilgrimage', label: 'Pilgrimage Tour' },
    { value: 'corporate', label: 'Corporate' }
  ];

  passengerOptions: SelectOption[] = [
    { value: '1-4', label: '1 – 4 passengers' },
    { value: '5-7', label: '5 – 7 passengers' },
    { value: '8-17', label: '8 – 17 passengers' },
    { value: '18-28', label: '18 – 28 passengers' },
    { value: '29+', label: '29+ passengers' }
  ];

  vehicleOptions: SelectOption[] = [
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'innova', label: 'Innova' },
    { value: 'tempo', label: 'Tempo Traveller' },
    { value: 'bus', label: 'Bus' }
  ];

  enquiryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.enquiryForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      whatsappNumber: [''],
      emailAddress: ['', [Validators.email]],
      address: ['', Validators.required],

      travelType: ['', Validators.required],
      pickupLocation: ['', Validators.required],
      destination: ['', Validators.required],
      travelDate: ['', Validators.required],
      returnDate: [''],
      passengers: ['', Validators.required],
      vehiclePreference: [''],

      pickupTime: [''],
      message: ['']
    });
  }

  get f() {
    return this.enquiryForm.controls;
  }

  selectVehicle(value: string): void {
    this.enquiryForm.patchValue({ vehiclePreference: value });
  }

  onSubmit(): void {
    if (this.enquiryForm.invalid) {
      this.enquiryForm.markAllAsTouched();
      return;
    }

    const v = this.enquiryForm.value;

    const lines = [
      `New Trip Enquiry — AKT Travels`,
      `Name: ${v.fullName}`,
      `Mobile: ${v.mobileNumber}`,
      v.whatsappNumber ? `WhatsApp: ${v.whatsappNumber}` : null,
      v.emailAddress ? `Email: ${v.emailAddress}` : null,
      `Address: ${v.address}`,
      `Travel Type: ${v.travelType}`,
      `Pickup: ${v.pickupLocation}`,
      `Destination: ${v.destination}`,
      `Travel Date: ${v.travelDate}`,
      v.returnDate ? `Return Date: ${v.returnDate}` : null,
      `Passengers: ${v.passengers}`,
      v.vehiclePreference ? `Vehicle Preference: ${v.vehiclePreference}` : null,
      v.pickupTime ? `Pickup Time: ${v.pickupTime}` : null,
      v.message ? `Message: ${v.message}` : null
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${this.whatsappNumber}?text=${text}`, '_blank');
  }
}