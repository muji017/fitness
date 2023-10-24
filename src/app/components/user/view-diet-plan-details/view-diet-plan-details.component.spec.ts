import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDietPlanDetailsComponent } from './view-diet-plan-details.component';

describe('ViewDietPlanDetailsComponent', () => {
  let component: ViewDietPlanDetailsComponent;
  let fixture: ComponentFixture<ViewDietPlanDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDietPlanDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewDietPlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
