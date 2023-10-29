import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DietPlansModel, trainer } from 'src/app/model/userModel';
import { getAllDietPlansListApi, getTrainersListApi } from 'src/app/store/action';
import { getAllDietPlans, getAllTrainers } from 'src/app/store/selector';

@Component({
  selector: 'app-user-trainer-profile',
  templateUrl: './user-trainer-profile.component.html',
  styleUrls: ['./user-trainer-profile.component.css']
})
export class UserTrainerProfileComponent {

  trainerId!: any
  trainer!: trainer | undefined
  trainers!:trainer[]
  dietplans!:number

  constructor(
    private store: Store<trainer[]>,
    private dietStore:Store<DietPlansModel[]>,
    private route: ActivatedRoute,
    private router:Router
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
     this.dietStore.dispatch(getAllDietPlansListApi())
     this.dietStore.select(getAllDietPlans).subscribe((res)=>{
      const data=res
      this.dietplans=data.filter((plan)=>plan.trainerId===this.trainerId).length
    })
  }

  viewDietPlans(){
    this.router.navigate([`/usertrainerdiet/${this.trainerId}`])
  }
  connect(){
    
  }
}
