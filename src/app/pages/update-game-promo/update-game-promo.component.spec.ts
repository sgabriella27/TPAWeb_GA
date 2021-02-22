import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGamePromoComponent } from './update-game-promo.component';

describe('UpdateGamePromoComponent', () => {
  let component: UpdateGamePromoComponent;
  let fixture: ComponentFixture<UpdateGamePromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGamePromoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGamePromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
