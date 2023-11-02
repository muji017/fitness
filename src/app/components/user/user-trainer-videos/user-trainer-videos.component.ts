import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { VideoModel } from 'src/app/model/userModel';
import { getAllVideoListApi } from 'src/app/store/action';
import { getAllVideos } from 'src/app/store/selector';

@Component({
  selector: 'app-user-trainer-videos',
  templateUrl: './user-trainer-videos.component.html',
  styleUrls: ['./user-trainer-videos.component.css']
})
export class UserTrainerVideosComponent {
  videos!:VideoModel[]
  searchQuery!:string
  searchVideo!:VideoModel[]
  trainerId:any
  constructor(
    private router:Router,
    private store:Store<VideoModel[]>,
    private route:ActivatedRoute
  ){
    this.route.params.subscribe(
      (params)=>{
        const id=params['trainerId']
        this.trainerId=id
      }
    )
  }

  ngOnInit(){
    this.store.dispatch(getAllVideoListApi())
    this.store.select(getAllVideos).subscribe((res)=>{
      const data=res
      this.videos=data.filter((plan)=>plan.trainerId===this.trainerId)
      this.searchVideo=data.filter((plan)=>plan.trainerId===this.trainerId)
    })
  }
  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.videos = this.searchVideo.filter((plan) => {
      return plan.title.toLowerCase().includes(filterValue);
    });
  }
  getVideos(videoId:any){
 this.router.navigate([`videoplayer/${videoId}`])
  }
}
