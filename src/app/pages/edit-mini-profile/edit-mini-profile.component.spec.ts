import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMiniProfileComponent } from './edit-mini-profile.component';

describe('EditMiniProfileComponent', () => {
  let component: EditMiniProfileComponent;
  let fixture: ComponentFixture<EditMiniProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMiniProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMiniProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
