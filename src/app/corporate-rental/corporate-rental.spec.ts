import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateRental } from './corporate-rental';

describe('CorporateRental', () => {
  let component: CorporateRental;
  let fixture: ComponentFixture<CorporateRental>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateRental],
    }).compileComponents();

    fixture = TestBed.createComponent(CorporateRental);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
