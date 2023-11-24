import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription, map } from 'rxjs';
import { VideoModel } from 'src/app/model/userModel';
import { UserService } from 'src/app/services/userServices/user.service';
import { getAllVideoListApi } from 'src/app/store/action';
import { getAllVideos } from 'src/app/store/selector';

@Component({
  selector: 'app-watchhistory',
  templateUrl: './watchhistory.component.html',
  styleUrls: ['./watchhistory.component.css']
})
export class WatchhistoryComponent {

  videos!: VideoModel[]
  userId!:string
  subscriptions:Subscription[]=[]
  apiUrl!:string

  constructor(
    private store: Store<VideoModel[]>,
    private userService:UserService,
    private router:Router,
    private toastr:ToastrService,
    private dialog:MatDialog
  ) {
    this.apiUrl=userService.getapiUrl()
   }

  ngOnInit() {
    this.store.dispatch(getAllVideoListApi())
    const getAllVideosSubscription=this.store.select(getAllVideos).subscribe((res) => {
      let data = res
      let videos = data.filter((data) => data.isApproved == true)
      this.userService.getWatchHistory().subscribe(
        (res)=>{
          const history=res
          const data:any=history.watchhistory
          let videoIds:string[]=data.videoId          
          this.videos=videos.filter((video)=>videoIds.includes(video._id))
        }
      )
    })
    this.subscriptions.push(getAllVideosSubscription)
  }

  getVideos(videoId:any,isPremium:boolean){
    this.dialog.closeAll()
    if(isPremium){
      this.userService.getProfile().pipe(
        map((res:any)=>{
          const user=res.user
          if(!user.subscriptionDate){
            this.toastr.info("Need to subscribe a plan to chat")
            this.router.navigate(['/subscription'])
            return
          }
          else {
            
              this.router.navigate([`videoplayer/${videoId}`])
          }
        })
      ).subscribe();
    }
    else{
      this.router.navigate([`videoplayer/${videoId}`])
    }
  }

  ngOnDestroy(){
    this.subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
