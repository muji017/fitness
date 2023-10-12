import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrainerProfileComponent } from './user-trainer-profile.component';

describe('UserTrainerProfileComponent', () => {
  let component: UserTrainerProfileComponent;
  let fixture: ComponentFixture<UserTrainerProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTrainerProfileComponent]
    });
    fixture = TestBed.createComponent(UserTrainerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
