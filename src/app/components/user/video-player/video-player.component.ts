import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { VideoModel } from 'src/app/model/userModel';
import { UserService } from 'src/app/services/userServices/user.service';
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
  subscriptions:Subscription[]=[]
  apiUrl!:string
  constructor(
    private store: Store<VideoModel[]>,
    private route: ActivatedRoute,
    private userService:UserService
  ) { 
    this.apiUrl=userService.getapiUrl()
  }

  ngOnInit() {
    const paramsSubscription= this.route.params.subscribe((params) => {
      const id = params['videoId'];
      this.videoId = id;
      const addWatchHistorySubscription=this.userService.addWatchHistory(this.videoId).subscribe()
      this.subscriptions.push(addWatchHistorySubscription)
    })
    this.store.dispatch(getAllVideoListApi())
    const getAllVideosSubscription=this.store.select(getAllVideos).subscribe((res) => {
      this.videos = res
      this.video = this.videos.find((tr) => tr._id === this.videoId)
   
    })
    this.subscriptions.push(paramsSubscription)
    this.subscriptions.push(getAllVideosSubscription)
  }
 
  
  splitIntoParagraphs(description: any | undefined): string[] {
    if (!description) {
      return [];
    }

    return description.split('\n');
  }
  ngOnDestroy(){
    this.subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

}
