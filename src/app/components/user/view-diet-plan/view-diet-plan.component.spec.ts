import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDietPlanComponent } from './view-diet-plan.component';

describe('ViewDietPlanComponent', () => {
  let component: ViewDietPlanComponent;
  let fixture: ComponentFixture<ViewDietPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDietPlanComponent]
    });
    fixture = TestBed.createComponent(ViewDietPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
