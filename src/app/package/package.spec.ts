import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { PackageComponent, getPackageBySlug } from './package';

describe('PackageComponent', () => {
  let component: PackageComponent;
  let fixture: ComponentFixture<PackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageComponent, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ slug: 'isha-yoga-center' })) },
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PackageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve a package from the slug route param', () => {
    expect(getPackageBySlug('isha-yoga-center')).toBeUndefined();
    expect(getPackageBySlug('isha-yoga-center-adiyogi')).toBeTruthy();
  });
});
