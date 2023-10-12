import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertrainerslistComponent } from './usertrainerslist.component';

describe('UsertrainerslistComponent', () => {
  let component: UsertrainerslistComponent;
  let fixture: ComponentFixture<UsertrainerslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsertrainerslistComponent]
    });
    fixture = TestBed.createComponent(UsertrainerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
