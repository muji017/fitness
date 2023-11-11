import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddVideoComponent } from '../add-video/add-video.component';
import { VideoModel } from 'src/app/model/userModel';
import { Store } from '@ngrx/store';
import { getAllVideos } from 'src/app/store/selector';
import { deleteVideoApi, getAllVideosTrainerApi } from 'src/app/store/action';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { ToastrService } from 'ngx-toastr';
import { EditVideoComponent } from '../edit-video/edit-video.component';

@Component({
  selector: 'app-trainer-videos-list',
  templateUrl: './trainer-videos-list.component.html',
  styleUrls: ['./trainer-videos-list.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class TrainerVideosListComponent {

  videos!:VideoModel[]
  searchVideos!:VideoModel[]
  searchQuery!:string


  constructor(
    private dialoge:MatDialog,
    private store:Store<VideoModel[]>,
    private toastr:ToastrService
  ){}

  ngOnInit(){
    this.store.dispatch(getAllVideosTrainerApi())
    this.store.select(getAllVideos).subscribe(
      (res)=>{
        this.videos=res
        this.searchVideos=res
        console.log(this.videos);
        
      }
    )
  }
  playVideo(planId:any){
    const data={
      planId:planId
    }
    this.dialoge.open(VideoPlayerComponent,{
      enterAnimationDuration:1100,
      exitAnimationDuration:1100,
      maxHeight: '500px',
      data:data
     })

  }
  addVideo(){
    this.dialoge.open(AddVideoComponent,{
      enterAnimationDuration:1100,
      exitAnimationDuration:1100,
      maxHeight: '500px'
     })

  }

  deleteVideo(videoId:any){
    this.store.dispatch(deleteVideoApi({videoId}))
    this.toastr.success("Video Deleted successfully")
    this.ngOnInit()
  }
  updatePlan(planId:any){
    const data={
     videoId:planId
    }
    this.dialoge.open(EditVideoComponent,{
     enterAnimationDuration:1100,
     exitAnimationDuration:1100,
     maxHeight: '500px',
     maxWidth:'400px',
     data:data
    })

 }

   applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.videos = this.searchVideos.filter((plan) => {
      return plan.title.toLowerCase().includes(filterValue);
    });
  }
}
