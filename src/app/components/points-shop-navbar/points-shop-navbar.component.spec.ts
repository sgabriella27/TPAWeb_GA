import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsShopNavbarComponent } from './points-shop-navbar.component';

describe('PointsShopNavbarComponent', () => {
  let component: PointsShopNavbarComponent;
  let fixture: ComponentFixture<PointsShopNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsShopNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsShopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
