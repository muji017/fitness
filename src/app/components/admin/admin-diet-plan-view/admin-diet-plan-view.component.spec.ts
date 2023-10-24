import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDietPlanViewComponent } from './admin-diet-plan-view.component';

describe('AdminDietPlanViewComponent', () => {
  let component: AdminDietPlanViewComponent;
  let fixture: ComponentFixture<AdminDietPlanViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDietPlanViewComponent]
    });
    fixture = TestBed.createComponent(AdminDietPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
