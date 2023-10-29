
import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDietPlanComponent } from '../add-diet-plan/add-diet-plan.component';
import { DietPlansModel } from 'src/app/model/userModel';
import { Store } from '@ngrx/store';
import { deleteDietPlanApi, getDietPlansListApi } from 'src/app/store/action';
import { getAllDietPlans } from 'src/app/store/selector';
import { EditDietPlanComponent } from '../edit-diet-plan/edit-diet-plan.component';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-trainer-diet-plan',
  templateUrl: './trainer-diet-plan.component.html',
  styleUrls: ['./trainer-diet-plan.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class TrainerDietPlanComponent {

  searchQuery!: string
  dietPlans!:DietPlansModel[]
  searchPlans!:DietPlansModel[]
  apiUrl!:string
  constructor(
    private dialoge:MatDialog,
    private userServce:UserService,
    private store:Store<DietPlansModel[]>
  ){
    this.apiUrl=userServce.getapiUrl()
  }

  ngOnInit(){
    this.store.dispatch(getDietPlansListApi())
    this.store.select(getAllDietPlans).subscribe((res)=>{
      const data=res
      this.dietPlans=data
      this.searchPlans=data
    })
  }
  
  addDietPlan(){
    this.dialoge.open(AddDietPlanComponent,{
      enterAnimationDuration:1100,
      exitAnimationDuration:1100,
      maxHeight: '500px',
      maxWidth:'400px'
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
      maxWidth:'400px',
      data:data
     })

  }
  splitIntoParagraphs(description: any | undefined): string[] {
    if (!description) {
      return [];
    }
  
    return description.split('\n');
  }
  deletePlan(planId:any){
    this.store.dispatch(deleteDietPlanApi({planId}))
    this.ngOnInit()
  }


   applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.dietPlans = this.searchPlans.filter((plan) => {
      return plan.title.toLowerCase().includes(filterValue);
    });
  }

}
