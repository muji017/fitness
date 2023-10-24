import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerVideosListComponent } from './trainer-videos-list.component';

describe('TrainerVideosListComponent', () => {
  let component: TrainerVideosListComponent;
  let fixture: ComponentFixture<TrainerVideosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerVideosListComponent]
    });
    fixture = TestBed.createComponent(TrainerVideosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
