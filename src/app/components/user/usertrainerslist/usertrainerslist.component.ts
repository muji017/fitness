import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsertrainerslistComponent {
  trainers!: trainer[]
  searchQuery!: string
  searchTrainer!: trainer[]
  apiUrl!: string
  constructor(
    private service: UserService,
    private store: Store<trainer[]>,
    private router: Router
  ) {
    this.apiUrl=service.getapiUrl()
  }

  ngOnInit() {

    this.store.dispatch(getTrainersListApi())
    this.store.select(getAllTrainers).subscribe((res) => {
      const data = res
      this.trainers = data.filter((data) => data.isVerified == true)
      this.searchTrainer = data.filter((data) => data.isVerified == true)
    })
  }
  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.trainers = this.searchTrainer.filter((tr) => {
      return tr.name.toLowerCase().includes(filterValue);
    });
  }
  getTrainerProfile(trainerId: any) {
    console.log(trainerId);

    this.router.navigate([`/Usertrainerprofile/${trainerId}`])
  }
}


