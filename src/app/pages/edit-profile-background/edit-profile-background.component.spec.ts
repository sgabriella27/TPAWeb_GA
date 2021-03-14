import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileBackgroundComponent } from './edit-profile-background.component';

describe('EditProfileBackgroundComponent', () => {
  let component: EditProfileBackgroundComponent;
  let fixture: ComponentFixture<EditProfileBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
