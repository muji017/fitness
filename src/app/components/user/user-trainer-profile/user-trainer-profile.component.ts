import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { DietPlansModel, trainer } from 'src/app/model/userModel';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/userServices/user.service';
import { getAllDietPlansListApi, getAllVideoListApi, getTrainersListApi } from 'src/app/store/action';
import { getAllDietPlans, getAllTrainers, getAllVideos } from 'src/app/store/selector';

@Component({
  selector: 'app-user-trainer-profile',
  templateUrl: './user-trainer-profile.component.html',
  styleUrls: ['./user-trainer-profile.component.css']
})
export class UserTrainerProfileComponent {

  trainerId!: any
  trainer!: trainer | undefined
  trainers!: trainer[]
  dietplans!: number
  videos!: number
  apiUrl!:string

  constructor(
    private store: Store<trainer[]>,
    private dietStore: Store<DietPlansModel[]>,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.apiUrl=userService.getapiUrl()
   }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['trainerId'];
      this.trainerId = id;
    })
    this.store.dispatch(getTrainersListApi())
    this.store.select(getAllTrainers).subscribe((res) => {
      this.trainers = res
      this.trainer = this.trainers.find((tr) => tr.id === this.trainerId)
      this.dietStore.dispatch(getAllDietPlansListApi())
      this.store.dispatch(getAllVideoListApi())
      this.dietStore.select(getAllDietPlans).subscribe((res) => {
        const data = res
        this.dietplans = data.filter((plan) => plan.trainerId === this.trainerId).length
      })
      this.store.select(getAllVideos).subscribe((res) => {
        const data = res
        this.videos = data.filter((plan) => plan.trainerId === this.trainerId).length
      })
    })

  }

  viewVideoPlans() {
    this.router.navigate([`/usertrainervideos/${this.trainerId}`])
  }
  viewDietPlans() {
    this.router.navigate([`/usertrainerdiet/${this.trainerId}`])
  }
  connect(trainerId: any) {
    this.userService.getProfile().pipe(
      map((res: any) => {
        const user = res.user
        if (!user.subscriptionDate) {
          this.toastr.info("Need to subscribe a plan to chat")
          return
        }
        else {
            this.chatService.getRoomUser(trainerId).subscribe(
              (res) => {
                this.router.navigate(['/chat']);
              })

        }
      })
    ).subscribe();
  }

}
