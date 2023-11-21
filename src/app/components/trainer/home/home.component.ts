import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartConfiguration, Chart } from 'chart.js';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DietPlansModel, VideoModel, userlist } from 'src/app/model/userModel';
import { getAllVideosTrainerApi, getDietPlansListApi } from 'src/app/store/action';
import { getAllDietPlans, getAllVideos } from 'src/app/store/selector';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

  subscriptions: Subscription[] = []
  apiUrl!:string
  dataSource: MatTableDataSource<VideoModel[]> = new MatTableDataSource<VideoModel[]>();
  displayedColumns: string[] = ['image', 'title', 'date', 'foodtype', 'description'];

  public doughnutChartLabels: string[] = ['No of Users', 'No of Subscribers', 'No of Trainers'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [], label: 'Series A' },
  ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  constructor(
    private dialoge: MatDialog,
    private videostore: Store<VideoModel[]>,
    private dietstore: Store<DietPlansModel[]>,
    private cdRef: ChangeDetectorRef,
    private userService:UserService
  ) {
  this.apiUrl=userService.getapiUrl()
  }
  ngOnInit() {
    this.videostore.dispatch(getAllVideosTrainerApi())
    this.dietstore.dispatch(getDietPlansListApi())
    this.getChartData()
  }
  watchVideo(planId: any) {
    const data = {
      planId: planId
    }
    this.dialoge.open(VideoPlayerComponent, {
      enterAnimationDuration: 1100,
      exitAnimationDuration: 1100,
      maxHeight: '500px',
      data: data
    })

  }

  getChartData() {
    const canvasElement: any = document.getElementById('chart');
    const existingChart = Chart.getChart(canvasElement);
    if (existingChart) {
      existingChart.destroy();
    }
    const chart = new Chart(canvasElement, {
      type: 'doughnut',
      data: {
        labels: ['No of Videos', 'No of Diet Plans'],
        datasets: [{ data: [3, 3], label: 'Datas :' }],
      },
      options: {
        responsive: false,
      },
    });
    let videoCount = 0;
    let dietCount = 0;
    const updateChartWithData = () => {
      const updatedData = [videoCount, dietCount];
      chart.data.datasets[0].data = updatedData;
      chart.update();
      this.cdRef.detectChanges();
    };

    const getAllvideoSubscription = this.videostore.select(getAllVideos).subscribe((videos) => {
      videoCount = videos.length;
      const currentDate = new Date();
      console.log('Current Date:', currentDate);
      const videoModel: any = videos.filter((video) => {
        if (video.uploadDate) {
          console.log('Date:', video.uploadDate);
          const userDate = new Date(video.uploadDate);
          const isSameDate =
            userDate.getDate() === currentDate.getDate() &&
            userDate.getMonth() === currentDate.getMonth() &&
            userDate.getFullYear() === currentDate.getFullYear();

          return isSameDate;
        }
        return false;
      });

      this.dataSource = videoModel
      updateChartWithData();
    });

    const getAlldietSubscription = this.dietstore.select(getAllDietPlans).subscribe((diets) => {
      dietCount = diets.length;

      updateChartWithData();
    });

    this.subscriptions.push(getAllvideoSubscription, getAlldietSubscription)
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
