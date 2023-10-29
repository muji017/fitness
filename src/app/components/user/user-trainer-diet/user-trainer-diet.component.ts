import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DietPlansModel } from 'src/app/model/userModel';
import { getAllDietPlans } from 'src/app/store/selector';

@Component({
  selector: 'app-user-trainer-diet',
  templateUrl: './user-trainer-diet.component.html',
  styleUrls: ['./user-trainer-diet.component.css']
})
export class UserTrainerDietComponent {

  dietplans:DietPlansModel[]|undefined
  trainerId:any
  constructor(
    private route:ActivatedRoute,
    private dietStore:Store<DietPlansModel[]>,
    private router:Router
  ){
    this.route.params.subscribe(
      (params)=>{
        const id=params['trainerId']
        this.trainerId=id
      }
    )
  }
  ngOnInit(){
  this.dietStore.select(getAllDietPlans).subscribe((res)=>{
    const data=res
    this.dietplans=data.filter((plan)=>plan.trainerId===this.trainerId)
  })
}
viewPlan(planId:any){
  this.router.navigate([`/viewdietplans/${planId}`])
}
}
