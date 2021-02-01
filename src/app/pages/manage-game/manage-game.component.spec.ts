import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGameComponent } from './manage-game.component';

describe('ManageGameComponent', () => {
  let component: ManageGameComponent;
  let fixture: ComponentFixture<ManageGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
