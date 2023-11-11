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

  constructor(
    private router: Router,
    private store: Store<DietPlansModel[]>,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

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
            const currentDate = new Date();
            const sday = currentDate.getDate();
            const smonth = currentDate.getMonth() + 1;
            const syear = currentDate.getFullYear();
            const formattedCurrentDate = new Date( sday, smonth - 1,syear);
            const userExpiryDate = new Date(user.expiryDate);

            console.log(formattedCurrentDate, userExpiryDate);

            if (formattedCurrentDate < userExpiryDate) {
              this.router.navigate([`/viewdietplans/${planId}`])
            } else {
              this.toastr.info("Your Subscription Plan is expired");
              this.router.navigate(['/subscription']);
            }
          }
        })
      ).subscribe();
    }
    else {
      this.router.navigate([`/viewdietplans/${planId}`])
    }
  }
}
