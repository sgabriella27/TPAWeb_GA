import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileHomeComponent } from './edit-profile-home.component';

describe('EditProfileHomeComponent', () => {
  let component: EditProfileHomeComponent;
  let fixture: ComponentFixture<EditProfileHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
