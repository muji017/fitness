import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { DietPlansModel } from 'src/app/model/userModel';
import { UserService } from 'src/app/services/userServices/user.service';
import { getAllDietPlansListApi, getDietPlansListApi } from 'src/app/store/action';
import { getAllDietPlans } from 'src/app/store/selector';

@Component({
  selector: 'app-view-diet-plan',
  templateUrl: './view-diet-plan.component.html',
  styleUrls: ['./view-diet-plan.component.css'],

})
export class ViewDietPlanComponent {

  dietPlans!: DietPlansModel[]
  searchQuery!: string
  searchPlans!: DietPlansModel[]
  apiUrl!:string

  constructor(
    private router: Router,
    private store: Store<DietPlansModel[]>,
    private userService: UserService,
    private toastr: ToastrService
  ) { 
    this.apiUrl=userService.getapiUrl()
  }

  ngOnInit() {
    this.store.dispatch(getAllDietPlansListApi())
    this.store.select(getAllDietPlans).subscribe((res) => {
      const data = res
      this.dietPlans = data.filter((data) => data.isApproved == true)
      this.searchPlans = data.filter((data) => data.isApproved == true)
    })
  }

  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.dietPlans = this.searchPlans.filter((plan) => {
      return plan.title.toLowerCase().includes(filterValue);
    });
  }
  viewPlan(planId: any, isPremium: any) {
    if (isPremium) {
      this.userService.getProfile().pipe(
        map((res: any) => {
          const user = res.user
          if (!user.subscriptionDate) {
            this.toastr.info("Need to subscribe a plan to chat")
            this.router.navigate(['/subscription'])
            return
          }
          else {
              this.router.navigate([`/viewdietplans/${planId}`])
          }
        })
      ).subscribe();
    }
    else {
      this.router.navigate([`/viewdietplans/${planId}`])
    }
  }
}
