import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { VideoModel } from 'src/app/model/userModel';
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
  constructor(
    private router:Router,
    private store:Store<VideoModel[]>
  ){}

  ngOnInit(){
    this.store.dispatch(getAllVideoListApi())
    this.store.select(getAllVideos).subscribe((res)=>{
      const data=res
      this.videos=data
      this.searchVideo=data
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
