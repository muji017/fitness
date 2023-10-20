import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUserPasswordComponent } from './set-user-password.component';

describe('SetUserPasswordComponent', () => {
  let component: SetUserPasswordComponent;
  let fixture: ComponentFixture<SetUserPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetUserPasswordComponent]
    });
    fixture = TestBed.createComponent(SetUserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
