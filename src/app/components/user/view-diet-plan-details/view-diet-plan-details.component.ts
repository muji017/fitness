import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DietPlansModel } from 'src/app/model/userModel';
import { UserService } from 'src/app/services/userServices/user.service';
import { getAllDietPlansListApi } from 'src/app/store/action';
import { getAllDietPlans } from 'src/app/store/selector';

@Component({
  selector: 'app-view-diet-plan-details',
  templateUrl: './view-diet-plan-details.component.html',
  styleUrls: ['./view-diet-plan-details.component.css']
})
export class ViewDietPlanDetailsComponent {

  planId!:any
  plan!:DietPlansModel|undefined
  plans!:DietPlansModel[]
  apiUrl!:string

  constructor(
  private store:Store<DietPlansModel[]>,
  private route: ActivatedRoute,
  private userService:UserService
) {
  this.apiUrl=userService.getapiUrl()
 }

ngOnInit() {
  this.route.params.subscribe((params) => {
    const id = params['planId'];
      this.planId = id;
  })
  this.store.dispatch(getAllDietPlansListApi())
  this.store.select(getAllDietPlans).subscribe((res) => {
    this.plans=res
    console.log(res);
    console.log(this.planId);
    this.plan=this.plans.find((tr)=>tr._id===this.planId)
  })
  
}

splitIntoParagraphs(description: any | undefined): string[] {
  if (!description) {
    return [];
  }

  return description.split('\n');
}

}
