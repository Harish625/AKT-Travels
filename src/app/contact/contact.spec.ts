import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanJourneyComponent } from './contact';

describe('PlanJourneyComponent', () => {
  let component: PlanJourneyComponent;
  let fixture: ComponentFixture<PlanJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanJourneyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanJourneyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
