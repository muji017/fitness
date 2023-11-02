import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { VideoModel } from 'src/app/model/userModel';
import { getAllVideoListApi } from 'src/app/store/action';
import { getAllVideos } from 'src/app/store/selector';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {

  videoId!: any
  video!: VideoModel | undefined
  videos!: VideoModel[]
  constructor(
    private store: Store<VideoModel[]>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['videoId'];
      this.videoId = id;
    })
    this.store.dispatch(getAllVideoListApi())
    this.store.select(getAllVideos).subscribe((res) => {
      this.videos = res
      this.video = this.videos.find((tr) => tr._id === this.videoId)
   
    })
  }
 
  
  splitIntoParagraphs(description: any | undefined): string[] {
    if (!description) {
      return [];
    }

    return description.split('\n');
  }

}
