import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosViewComponent } from './videos-view.component';

describe('VideosViewComponent', () => {
  let component: VideosViewComponent;
  let fixture: ComponentFixture<VideosViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideosViewComponent]
    });
    fixture = TestBed.createComponent(VideosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
