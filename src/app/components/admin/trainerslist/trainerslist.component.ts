import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { trainer } from 'src/app/model/userModel';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { getTrainersListApi } from 'src/app/store/action';
import { getAllTrainers } from 'src/app/store/selector';

@Component({
  selector: 'app-trainerslist',
  templateUrl: './trainerslist.component.html',
  styleUrls: ['./trainerslist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrainerslistComponent {

  trainers!:trainer[]
  searchQuery!:string

  dataSource!:trainer[]

  displayedColumns: string[] = ['image', 'name', 'email', 'qualification','jobPosition', 'specification','discription',
'location',];

  constructor(
    private adminService: AdminService,
    private store:Store<trainer[]>
  ) { }

  ngOnInit(){
    this.store.dispatch(getTrainersListApi())
    this.store.select(getAllTrainers).subscribe((res)=>{
      console.log(res)
      this.dataSource=res
    })
  }

}
