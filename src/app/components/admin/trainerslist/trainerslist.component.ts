import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { trainer } from 'src/app/model/userModel';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { changeTrainerStatusApi, getTrainersListAdminApi, getTrainersListApi } from 'src/app/store/action';
import { getAllTrainers } from 'src/app/store/selector';
import { AddTrainerComponent } from '../add-trainer/add-trainer.component';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trainerslist',
  templateUrl: './trainerslist.component.html',
  styleUrls: ['./trainerslist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrainerslistComponent {

  trainers!: trainer[]
  searchQuery!: string
  

  dataSource: MatTableDataSource<trainer> = new MatTableDataSource<trainer>();

  displayedColumns: string[] = ['image', 'name', 'email', 'qualification', 'jobPosition', 'specification', 'discription',
    'location', 'options'];

  constructor(
    private adminService: AdminService,
    private dialoge:MatDialog,
    private store: Store<trainer[]>,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
    this.store.dispatch(getTrainersListAdminApi())
    this.getTrainers()
  }
  changeStatus(trainerId: any) {
    this.store.dispatch(changeTrainerStatusApi({ trainerId }))
    this.getTrainers()
    this.toastr.success("successfully Updated")
  }
  getTrainers() {
    this.store.select(getAllTrainers).subscribe((res) => {
      this.dataSource.data = res
      console.log(this.dataSource.data)
    })
  }
  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  addTrainer() {
       this.dialoge.open(AddTrainerComponent,{
        enterAnimationDuration:1100,
        exitAnimationDuration:1100,
        maxHeight: '500px'
       })
  }
  ngOnDestroy(){
    
  }
}
