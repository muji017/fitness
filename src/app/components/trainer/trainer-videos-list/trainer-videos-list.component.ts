import { Component, HostListener, ViewChild, ViewEncapsulation , AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddVideoComponent } from '../add-video/add-video.component';
import { VideoModel } from 'src/app/model/userModel';
import { Store } from '@ngrx/store';
import { getAllVideos } from 'src/app/store/selector';
import { deleteVideoApi, getAllVideosTrainerApi } from 'src/app/store/action';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { ToastrService } from 'ngx-toastr';
import { EditVideoComponent } from '../edit-video/edit-video.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-trainer-videos-list',
  templateUrl: './trainer-videos-list.component.html',
  styleUrls: ['./trainer-videos-list.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class TrainerVideosListComponent implements AfterViewInit {

  videos!:VideoModel[]
  apiUrl!:string
  searchVideos!:VideoModel[]
  searchQuery!:string
  isScrolled:boolean=false
  pagedVideos: VideoModel[] = []; 
  pageSize = 5; 
  dataSource: MatTableDataSource<VideoModel[]> = new MatTableDataSource<VideoModel[]>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialoge:MatDialog,
    private store:Store<VideoModel[]>,
    private toastr:ToastrService,
    private userService:UserService
  ){
    this.apiUrl=userService.getapiUrl()
  }
   @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isScrolled = window.scrollY > 0;
  }
  ngOnInit() {
    this.store.dispatch(getAllVideosTrainerApi());
    this.store.select(getAllVideos).subscribe(
      (res) => {
        this.videos = res;
        this.pagedVideos = res;
        this.searchVideos = res;
        this.setupPaginator();
      }
    );
  }
  
  ngAfterViewInit() {
    this.updatePagedVideos();
  }
  
  updatePagedVideos() {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      this.pagedVideos = this.videos.slice(startIndex, endIndex);
    }
  }
  
  setupPaginator() {
    if (this.paginator) {
      this.paginator.pageSize = 5;
      this.paginator.page.subscribe(() => this.updatePagedVideos());
    }
  }
  
  onPageChange(event: any) {
    this.updatePagedVideos();
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
