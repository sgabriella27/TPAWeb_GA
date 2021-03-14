import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImgvidComponent } from './add-imgvid.component';

describe('AddImgvidComponent', () => {
  let component: AddImgvidComponent;
  let fixture: ComponentFixture<AddImgvidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImgvidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImgvidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
