import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PlansModel } from 'src/app/model/userModel';
import { AddPlanComponent } from '../add-plan/add-plan.component';
import { EditPlanComponent } from '../edit-plan/edit-plan.component';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { changePlanStatusApi, getPlansListApi } from 'src/app/store/action';
import { getAllPlans } from 'src/app/store/selector';
// import { getAllPlans } from 'src/app/store/selector';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlansComponent {


  searchQuery!: string


  dataSource: MatTableDataSource<PlansModel> = new MatTableDataSource<PlansModel>();

  displayedColumns: string[] = ['title', 'duration', 'amount', 'description', 'options'];

  constructor(
    private adminService: AdminService,
    private dialoge: MatDialog,
    private store: Store<PlansModel[]>
  ) { }

  ngOnInit() {
    this.store.dispatch(getPlansListApi())
    this.getPlans()
  }
  blockPlan(planId: any) {
    this.store.dispatch(changePlanStatusApi({ planId }))
    this.getPlans()
  }
  getPlans() {
    this.store.select(getAllPlans).subscribe((res) => {
      this.dataSource.data = res
      console.log(this.dataSource.data)
    })
  }
  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  addPlan() {
    this.dialoge.open(AddPlanComponent, {
      enterAnimationDuration: 1100,
      exitAnimationDuration: 1100,
      maxHeight: '500px',
      width:'400px'
    })
  }

  editPlan(planId: any) {
    const data={
      planId:planId
    }
    console.log(planId)
    this.dialoge.open(EditPlanComponent, {
      enterAnimationDuration: 1100,
      exitAnimationDuration: 1100,
      maxHeight: '500px',
      data:data
    })
  }

}


