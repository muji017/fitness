import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DietPlansModel } from 'src/app/model/userModel';
import { getAllDietPlansListApi, getDietPlansListApi } from 'src/app/store/action';
import { getAllDietPlans } from 'src/app/store/selector';

@Component({
  selector: 'app-view-diet-plan',
  templateUrl: './view-diet-plan.component.html',
  styleUrls: ['./view-diet-plan.component.css'],

})
export class ViewDietPlanComponent {
   
  dietPlans!:DietPlansModel[]


  constructor(
    private router:Router,
    private store:Store<DietPlansModel[]>
  ){}
  
  ngOnInit(){
    this.store.dispatch(getAllDietPlansListApi())
    this.store.select(getAllDietPlans).subscribe((res)=>{
      const data=res
      this.dietPlans=data
    })
  }

  viewPlan(planId:any){
      this.router.navigate([`/viewdietplans/${planId}`])
  }
}
