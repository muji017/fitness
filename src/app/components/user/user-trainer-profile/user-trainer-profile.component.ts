import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { trainer } from 'src/app/model/userModel';
import { getTrainersListApi } from 'src/app/store/action';
import { getAllTrainers } from 'src/app/store/selector';

@Component({
  selector: 'app-user-trainer-profile',
  templateUrl: './user-trainer-profile.component.html',
  styleUrls: ['./user-trainer-profile.component.css']
})
export class UserTrainerProfileComponent {

  trainerId!: any
  trainer!: trainer | undefined
  trainers!:trainer[]

  constructor(
    private store: Store<trainer[]>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['trainerId'];
        this.trainerId = id;
    })
    this.store.select(getAllTrainers).subscribe((res) => {
      this.trainers=res
    })
     this.trainer=this.trainers.find((tr)=>tr.id===this.trainerId)
  }

  connect(){
    
  }
}
