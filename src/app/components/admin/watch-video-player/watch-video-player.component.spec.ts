import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchVideoPlayerComponent } from './watch-video-player.component';

describe('WatchVideoPlayerComponent', () => {
  let component: WatchVideoPlayerComponent;
  let fixture: ComponentFixture<WatchVideoPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatchVideoPlayerComponent]
    });
    fixture = TestBed.createComponent(WatchVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
