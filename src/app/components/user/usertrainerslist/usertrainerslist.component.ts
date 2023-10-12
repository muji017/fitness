import { Component } from '@angular/core';
import { Store} from '@ngrx/store';
import { trainer } from 'src/app/model/userModel';
import { UserService } from 'src/app/services/userServices/user.service';
import { getTrainersListApi, getTrainersListApiSuccess } from 'src/app/store/action';
import { getAllTrainers } from 'src/app/store/selector';

@Component({
  selector: 'app-usertrainerslist',
  templateUrl: './usertrainerslist.component.html',
  styleUrls: ['./usertrainerslist.component.css']
})
export class UsertrainerslistComponent {
  trainers!: trainer[]
  constructor(private service: UserService
    , private store: Store<any>
  ) { }

  ngOnInit() {

    this.store.dispatch(getTrainersListApi())
    this.store.select(getAllTrainers).subscribe((res)=>{
      this.trainers=res
    })
  }
}


