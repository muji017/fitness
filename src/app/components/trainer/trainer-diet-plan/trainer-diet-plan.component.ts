
import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDietPlanComponent } from '../add-diet-plan/add-diet-plan.component';
import { DietPlansModel } from 'src/app/model/userModel';
import { Store } from '@ngrx/store';
import { deleteDietPlanApi, getDietPlansListApi } from 'src/app/store/action';
import { getAllDietPlans } from 'src/app/store/selector';
import { EditDietPlanComponent } from '../edit-diet-plan/edit-diet-plan.component';

@Component({
  selector: 'app-trainer-diet-plan',
  templateUrl: './trainer-diet-plan.component.html',
  styleUrls: ['./trainer-diet-plan.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class TrainerDietPlanComponent {

  searchQuery!: string
  dietPlans!:DietPlansModel[]

  constructor(
    private dialoge:MatDialog,
    private store:Store<DietPlansModel[]>
  ){}

  ngOnInit(){
    this.store.dispatch(getDietPlansListApi())
    this.store.select(getAllDietPlans).subscribe((res)=>{
      const data=res
      this.dietPlans=data
    })
  }
  
  addDietPlan(){
    this.dialoge.open(AddDietPlanComponent,{
      enterAnimationDuration:1100,
      exitAnimationDuration:1100,
      maxHeight: '500px'
     })

  }
  updatePlan(planId:any){
     const data={
      planId:planId
     }
     this.dialoge.open(EditDietPlanComponent,{
      enterAnimationDuration:1100,
      exitAnimationDuration:1100,
      maxHeight: '500px',
      data:data
     })

  }
  deletePlan(planId:any){
    this.store.dispatch(deleteDietPlanApi({planId}))
    this.ngOnInit()
  }


  applyFilter(){}

}
