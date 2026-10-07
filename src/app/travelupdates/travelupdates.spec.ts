import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Travelupdates } from './travelupdates';

describe('Travelupdates', () => {
  let component: Travelupdates;
  let fixture: ComponentFixture<Travelupdates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Travelupdates],
    }).compileComponents();

    fixture = TestBed.createComponent(Travelupdates);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
