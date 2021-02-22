import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertGamePromoComponent } from './insert-game-promo.component';

describe('InsertGamePromoComponent', () => {
  let component: InsertGamePromoComponent;
  let fixture: ComponentFixture<InsertGamePromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertGamePromoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertGamePromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
