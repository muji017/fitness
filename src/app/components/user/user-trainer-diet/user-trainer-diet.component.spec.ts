import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrainerDietComponent } from './user-trainer-diet.component';

describe('UserTrainerDietComponent', () => {
  let component: UserTrainerDietComponent;
  let fixture: ComponentFixture<UserTrainerDietComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTrainerDietComponent]
    });
    fixture = TestBed.createComponent(UserTrainerDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
