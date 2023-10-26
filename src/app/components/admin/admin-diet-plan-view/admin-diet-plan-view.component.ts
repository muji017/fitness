import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { DietPlansModel } from 'src/app/model/userModel';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { changeDietPremiumApi, getAllAdminDietPlansListApi, getAllDietPlansListApi, getDietPlansListApi } from 'src/app/store/action';
import { getAllDietPlans } from 'src/app/store/selector';

@Component({
  selector: 'app-admin-diet-plan-view',
  templateUrl: './admin-diet-plan-view.component.html',
  styleUrls: ['./admin-diet-plan-view.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AdminDietPlanViewComponent {

  dietPlans!:DietPlansModel[]
  searchQuery!: string
  

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  displayedColumns: string[] = ['image', 'title', 'date', 'foodtype', 'description', 'options','premium'];
    constructor(
      private store:Store<DietPlansModel[]>
    ){}
  
    ngOnInit(){
      this.store.dispatch(getAllAdminDietPlansListApi())
      this.getplans()
    }
  changeStatus(trainerId: any) {
    // this.store.dispatch(changeTrainerStatusApi({ trainerId }))
    // this.getplans()
  }
  getplans() {
    this.store.select(getAllDietPlans).subscribe((res)=>{
      const data=res
      this.dietPlans=data
      this.dataSource.data=this.dietPlans
    })
  }


  premiumChanged(planId:any){
    console.log("premium");
    
    console.log(planId);
    
     this.store.dispatch(changeDietPremiumApi({planId}))
  }

  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy(){
    
  }

}
