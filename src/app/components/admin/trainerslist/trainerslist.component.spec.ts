import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerslistComponent } from './trainerslist.component';

describe('TrainerslistComponent', () => {
  let component: TrainerslistComponent;
  let fixture: ComponentFixture<TrainerslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerslistComponent]
    });
    fixture = TestBed.createComponent(TrainerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
