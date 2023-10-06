import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOtpComponent } from './admin-otp.component';

describe('AdminOtpComponent', () => {
  let component: AdminOtpComponent;
  let fixture: ComponentFixture<AdminOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOtpComponent]
    });
    fixture = TestBed.createComponent(AdminOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
