import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChatTrainerListDialogeComponent } from './user-chat-trainer-list-dialoge.component';

describe('UserChatTrainerListDialogeComponent', () => {
  let component: UserChatTrainerListDialogeComponent;
  let fixture: ComponentFixture<UserChatTrainerListDialogeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserChatTrainerListDialogeComponent]
    });
    fixture = TestBed.createComponent(UserChatTrainerListDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
