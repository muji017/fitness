import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DietPlansModel } from 'src/app/model/userModel';
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
  constructor(
  private store:Store<DietPlansModel[]>,
  private route: ActivatedRoute
) { }

ngOnInit() {
  this.route.params.subscribe((params) => {
    const id = params['planId'];
      this.planId = id;
  })
  this.store.select(getAllDietPlans).subscribe((res) => {
    this.plans=res
  })
   this.plan=this.plans.find((tr)=>tr._id===this.planId)
}

splitIntoParagraphs(description: any | undefined): string[] {
  if (!description) {
    return [];
  }

  return description.split('\n');
}

}
