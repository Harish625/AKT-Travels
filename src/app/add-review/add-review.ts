import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface Review {
  id: number;
  name: string;
  location: string;
  serviceUsed: string;
  rating: number;
  reviewText: string;
  date: string;
}

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-review.html',
 
})
export class AddReviewComponent {

  private readonly STORAGE_KEY = 'akt_travels_reviews';

  reviewForm: FormGroup;
  hoverRating = 0;
  isSubmitting = false;
  isSubmitted = false;

  serviceOptions = [
    'SUV Rental', 'Car Rental', 'Tempo Traveller', 'Bus Rental',
    'Airport Drop', 'Outstation Trip', 'Local Sightseeing', 'Other'
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.reviewForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      location: ['', [Validators.required, Validators.maxLength(60)]],
      serviceUsed: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(1)]],
      reviewText: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(400)]]
    });
  }

  get f() { return this.reviewForm.controls; }

  get charCount(): number {
    return (this.reviewForm.get('reviewText')?.value || '').length;
  }

  setRating(value: number): void {
    this.reviewForm.patchValue({ rating: value });
  }

  setHoverRating(value: number): void {
    this.hoverRating = value;
  }

  clearHoverRating(): void {
    this.hoverRating = 0;
  }

  onSubmit(): void {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const newReview: Review = {
      id: Date.now(),
      name: this.reviewForm.value.name.trim(),
      location: this.reviewForm.value.location.trim(),
      serviceUsed: this.reviewForm.value.serviceUsed,
      rating: this.reviewForm.value.rating,
      reviewText: this.reviewForm.value.reviewText.trim(),
      date: new Date().toISOString()
    };

    setTimeout(() => {
      this.saveReview(newReview);
      this.isSubmitting = false;
      this.isSubmitted = true;

      setTimeout(() => {
        this.router.navigate(['/'], { fragment: 'reviews' });
      }, 1800);
    }, 700);
  }

  private saveReview(review: Review): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const reviews: Review[] = stored ? JSON.parse(stored) : [];
      reviews.push(review);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error('Could not save review', e);
    }
  }
}