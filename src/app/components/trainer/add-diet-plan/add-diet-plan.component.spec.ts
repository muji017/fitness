import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDietPlanComponent } from './add-diet-plan.component';

describe('AddDietPlanComponent', () => {
  let component: AddDietPlanComponent;
  let fixture: ComponentFixture<AddDietPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDietPlanComponent]
    });
    fixture = TestBed.createComponent(AddDietPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
