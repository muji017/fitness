import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerDietPlanComponent } from './trainer-diet-plan.component';

describe('TrainerDietPlanComponent', () => {
  let component: TrainerDietPlanComponent;
  let fixture: ComponentFixture<TrainerDietPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerDietPlanComponent]
    });
    fixture = TestBed.createComponent(TrainerDietPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
