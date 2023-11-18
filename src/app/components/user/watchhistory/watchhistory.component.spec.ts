import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchhistoryComponent } from './watchhistory.component';

describe('WatchhistoryComponent', () => {
  let component: WatchhistoryComponent;
  let fixture: ComponentFixture<WatchhistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatchhistoryComponent]
    });
    fixture = TestBed.createComponent(WatchhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
