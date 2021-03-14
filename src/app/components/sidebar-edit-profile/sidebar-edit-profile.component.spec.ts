import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarEditProfileComponent } from './sidebar-edit-profile.component';

describe('SidebarEditProfileComponent', () => {
  let component: SidebarEditProfileComponent;
  let fixture: ComponentFixture<SidebarEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarEditProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
