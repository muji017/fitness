import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { VideoModel } from 'src/app/model/userModel';
import { UserService } from 'src/app/services/userServices/user.service';
import { getAllVideos } from 'src/app/store/selector';

@Component({
  selector: 'app-watch-video-player',
  templateUrl: './watch-video-player.component.html',
  styleUrls: ['./watch-video-player.component.css']
})
export class WatchVideoPlayerComponent {
  planId!:string
  videos!:VideoModel[]
  video!:VideoModel
  apiUrl!:string
  constructor(
    private dialoge: MatDialog,
    private store: Store<VideoModel[]>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService:UserService
  ){
    this.apiUrl=userService.getapiUrl()
    this.planId=data.planId
  }
  ngOnInit(){
    this.store.select(getAllVideos).subscribe((res) => {
      const data = res
      this.videos = data.filter((dp)=>dp._id==this.planId)
      this.video=this.videos[0]
    })
  }
}
