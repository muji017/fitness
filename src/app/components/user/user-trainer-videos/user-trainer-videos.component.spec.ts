import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrainerVideosComponent } from './user-trainer-videos.component';

describe('UserTrainerVideosComponent', () => {
  let component: UserTrainerVideosComponent;
  let fixture: ComponentFixture<UserTrainerVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTrainerVideosComponent]
    });
    fixture = TestBed.createComponent(UserTrainerVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
