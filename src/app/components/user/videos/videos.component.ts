import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { VideoModel } from 'src/app/model/userModel';
import { UserService } from 'src/app/services/userServices/user.service';
import { getAllVideoListApi } from 'src/app/store/action';
import { getAllVideos } from 'src/app/store/selector';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {
 
  videos!:VideoModel[]
  searchQuery!:string
  searchVideo!:VideoModel[]  
  apiUrl!:string
  constructor(
    private router:Router,
    private store:Store<VideoModel[]>,
    private userService:UserService,
    private toastr:ToastrService
  ){
    this.apiUrl=userService.getapiUrl()
  }

  ngOnInit(){
    this.store.dispatch(getAllVideoListApi())
    this.store.select(getAllVideos).subscribe((res)=>{
      const data=res
      this.videos=data.filter((data)=>data.isApproved==true)
      this.searchVideo=data.filter((data)=>data.isApproved==true)
    })
  }
  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.videos = this.searchVideo.filter((plan) => {
      return plan.title.toLowerCase().includes(filterValue);
    });
  }
  getVideos(videoId:any,isPremium:boolean){
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
}
