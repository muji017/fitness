import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ChartConfiguration, Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { DietPlansModel, UserModel, VideoModel, trainer, userlist } from 'src/app/model/userModel';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { UserService } from 'src/app/services/userServices/user.service';
import { getAllAdminDietPlansListApi, getAllAdminVideosListApi, getSubscriberListApi, getTrainersListAdminApi, getUsersListApi } from 'src/app/store/action';
import { getAllDietPlans, getAllTrainers, getAllUsers, getAllVideos } from 'src/app/store/selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  dataSource: MatTableDataSource<userlist> = new MatTableDataSource<userlist>();
  usersCount!: number
  subscribersCount!: number
  trainersCount!: number
  subscriptions: Subscription[] = []
  apiUrl!:string

  displayedColumns: string[] = ['image', 'name', 'email', 'subscriptionPlan', 'amount', 'subscriptionDate', 'expiryDate'];

  public doughnutChartLabels: string[] = ['No of Users', 'No of Subscribers', 'No of Trainers'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [], label: 'Series A' },
  ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'videos' },
      { data: [], label: 'Diet Plans' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor(
    private userStore: Store<UserModel[]>,
    private trainerStore: Store<trainer[]>,
    private videostore: Store<VideoModel[]>,
    private store: Store<DietPlansModel[]>,
    private adminService: AdminService,
    private cdRef: ChangeDetectorRef,
    private userService:UserService
  ) { 
    this.apiUrl=userService.getapiUrl()
  }
  ngOnInit() {
    this.userStore.dispatch(getUsersListApi())
    this.trainerStore.dispatch(getTrainersListAdminApi())
    this.videostore.dispatch(getAllAdminVideosListApi())
    this.store.dispatch(getAllAdminDietPlansListApi())
    
    this.getChart2Data()
    this.getChart1Data()
  }
  getChart2Data() {
    const canvasElement: any = document.getElementById('chart2');
    const existingChart = Chart.getChart(canvasElement);
    if (existingChart) {
      existingChart.destroy();
    }
    const chart = new Chart(canvasElement, {
      type: 'doughnut',
      data: {
        labels: ['No of Users', 'No of Subscribers', 'No of Trainers'],
        datasets: [{ data: [0, 3, 3], label: 'Datas :' }],
      },
      options: {
        responsive: false,
      },
    });
    let userCount = 0;
    let trainerCount = 0;
    let subscribersCount = 0;
    const updateChartWithData = () => {
      const updatedData = [userCount, subscribersCount, trainerCount];
      chart.data.datasets[0].data = updatedData;
      chart.update();
      this.cdRef.detectChanges();
    };

    const getAllUsersSubscription = this.userStore.select(getAllUsers).subscribe((users) => {
      userCount = users.length;

      updateChartWithData();
    });

    const getAllSubscribersSubscription = this.adminService.getSubscribersList().subscribe((sub) => {
      subscribersCount = sub.users.length
      const currentDate = new Date();
      console.log('Current Date:', currentDate);

      const userModel: any = sub.users.filter((user) => {
        if (user.subscriptionDate) {
          console.log('User Subscription Date:', user.subscriptionDate);
          const [day, month, year] = user.subscriptionDate.split('/');
          const userDate = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
          const isSameDate = userDate.getDate() === currentDate.getDate() &&
            userDate.getMonth() === currentDate.getMonth() &&
            userDate.getFullYear() === currentDate.getFullYear();

          return isSameDate;
        }
        return false;
      });
      this.subscribersCount=userModel.length
      this.dataSource = userModel
      updateChartWithData();
    })

    const getAllTrainersSubscription = this.trainerStore.select(getAllTrainers).subscribe((trainers) => {
      trainerCount = trainers.length;
      updateChartWithData();
    });

    this.subscriptions.push(getAllUsersSubscription, getAllTrainersSubscription, getAllSubscribersSubscription);
  }

  getChart1Data() {
    // Replace this with your logic to get the actual data
    let trainers
    const getAllTrainersSubscription = this.trainerStore.select(getAllTrainers).subscribe((trainers) => {
      trainers=trainers
      let labels=trainers.map((trainer)=>trainer.name)
      this.videostore.select(getAllVideos).subscribe((videos) => {
        const videoCounts = trainers.map((trainer) => {
          // Assuming each trainer has a 'videos' property
          const trainerVideos = videos.filter((video) => video.trainerId === trainer.id);
          return trainerVideos.length;
        });
    
        this.store.select(getAllDietPlans).subscribe((diets) => {
          const dietCount = trainers.map((trainer) => {
            // Assuming each trainer has a 'videos' property
            const trainerDiets = diets.filter((diet) => diet.trainerId === trainer.id);
            return trainerDiets.length;
        })

    const newData = {
      labels:labels,
      datasets: [
        { data: videoCounts, label: 'Videos' },
        { data: dietCount, label: 'Diets' }
      ]
    };
    
    // Update the existing chart data
    this.barChartData.labels = newData.labels;
    this.barChartData.datasets[0].data = newData.datasets[0].data;
    this.barChartData.datasets[1].data = newData.datasets[1].data;
  
    // Update the chart
    const canvasElement: any = document.getElementById('chart1');
    const chart = Chart.getChart(canvasElement);
  
    if (chart) {
      chart.update();
      this.cdRef.detectChanges();
    }
  })
  })
  });
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
