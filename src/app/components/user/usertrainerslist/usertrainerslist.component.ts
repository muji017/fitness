import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store} from '@ngrx/store';
import { trainer } from 'src/app/model/userModel';
import { UserService } from 'src/app/services/userServices/user.service';
import { getTrainersListApi, getTrainersListApiSuccess } from 'src/app/store/action';
import { getAllTrainers } from 'src/app/store/selector';
import { UserTrainerProfileComponent } from '../user-trainer-profile/user-trainer-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usertrainerslist',
  templateUrl: './usertrainerslist.component.html',
  styleUrls: ['./usertrainerslist.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class UsertrainerslistComponent {
  trainers!: trainer[]
  constructor(private service: UserService
    , private store: Store<trainer[]>,
   private router:Router
  ) { }

  ngOnInit() {

    this.store.dispatch(getTrainersListApi())
    this.store.select(getAllTrainers).subscribe((res)=>{
      const data=res
      this.trainers=data.filter((data)=>data.isVerified==true)
    })
  }

  getTrainerProfile(trainerId:any){
     this.router.navigate([`/Usertrainerprofile/${trainerId}`])
  }
}


