import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { DietPlansModel } from 'src/app/model/userModel';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { UserService } from 'src/app/services/userServices/user.service';
import { changeDietPlanStatusApi, changeDietPremiumApi, getAllAdminDietPlansListApi, getAllDietPlansListApi, getDietPlansListApi } from 'src/app/store/action';
import { getAllDietPlans } from 'src/app/store/selector';

@Component({
  selector: 'app-admin-diet-plan-view',
  templateUrl: './admin-diet-plan-view.component.html',
  styleUrls: ['./admin-diet-plan-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminDietPlanViewComponent {

  dietPlans!: DietPlansModel[]
  apiUrl!:string
  searchQuery!: string
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['image', 'title', 'date', 'foodtype', 'description', 'options', 'premium'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(
    private store: Store<DietPlansModel[]>,
    private toastr:ToastrService,
    private userService:UserService
  ) {
    this.apiUrl=userService.getapiUrl()
   }

  ngOnInit() {
    this.store.dispatch(getAllAdminDietPlansListApi())
    this.getplans()
    this.dataSource.paginator = this.paginator;
  }
  changeStatus(planId: any) {
    this.store.dispatch(changeDietPlanStatusApi({ planId }))
    this.getplans()
    this.toastr.success("successfully Updated")
  }
  getplans() {
    this.store.select(getAllDietPlans).subscribe((res) => {
      const data = res
      this.dietPlans = data
      this.dataSource.data = this.dietPlans
    })
  }


  premiumChanged(planId: any) {
    this.store.dispatch(changeDietPremiumApi({ planId }))
    this.toastr.success("successfully Updated")
  }

  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy() {

  }

}
