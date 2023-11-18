import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { VideoModel } from 'src/app/model/userModel';
import { changeVideoPremiumApi, changeVideoStatusApi, getAllAdminVideosListApi } from 'src/app/store/action';
import { getAllVideos } from 'src/app/store/selector';
import { WatchVideoPlayerComponent } from '../watch-video-player/watch-video-player.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-videos-view',
  templateUrl: './videos-view.component.html',
  styleUrls: ['./videos-view.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class VideosViewComponent {
  videos!: VideoModel[]
  searchQuery!: string
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['image', 'title', 'date', 'foodtype', 'description', 'options', 'premium'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(
    private store: Store<VideoModel[]>,
    private toastr:ToastrService,
    private dialoge:MatDialog
  ) { }

  ngOnInit() {
    this.store.dispatch(getAllAdminVideosListApi())
    this.getplans()
    this.dataSource.paginator = this.paginator;
  }

  watchVideo(planId:any){
    console.log("watch videos",planId);
    const data={
      planId:planId
    }
    this.dialoge.open(WatchVideoPlayerComponent,{
      enterAnimationDuration:1100,
      exitAnimationDuration:1100,
      maxHeight: '500px',
      data:data
     })
  }
  changeStatus(videoId: any) {
    this.store.dispatch(changeVideoStatusApi({ videoId }))
    this.getplans()
    this.toastr.success("successfully Updated")
  }
  getplans() {
    this.store.select(getAllVideos).subscribe((res) => {
      const data = res
      this.videos = data
      this.dataSource.data = this.videos
    })
  }


  premiumChanged(videoId: any) {
    this.store.dispatch(changeVideoPremiumApi({ videoId }))
    this.toastr.success("successfully Updated")
  }

  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy() {

  }
}
