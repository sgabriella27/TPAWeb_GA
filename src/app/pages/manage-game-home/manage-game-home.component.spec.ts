import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGameHomeComponent } from './manage-game-home.component';

describe('ManageGameHomeComponent', () => {
  let component: ManageGameHomeComponent;
  let fixture: ComponentFixture<ManageGameHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGameHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGameHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
