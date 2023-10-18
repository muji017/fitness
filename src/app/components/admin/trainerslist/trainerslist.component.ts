import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { trainer } from 'src/app/model/userModel';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { getAllTrainers } from 'src/app/store/selector';

@Component({
  selector: 'app-trainerslist',
  templateUrl: './trainerslist.component.html',
  styleUrls: ['./trainerslist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrainerslistComponent {

  trainers!:trainer[]
  constructor(
    private adminService: AdminService,
    private store:Store<trainer[]>
  ) { }

  ngOnInit(){
    this.store.select(getAllTrainers).subscribe((res)=>{
      this.trainers=res
      console.log(this.trainers)
    })
  }








  dataSource = [

    { No: '1', name: 'Mujeeb', email: 'muji@gmaiil.com', qualification: 'BSc ', Level: '3' },
    { No: '2', name: 'Vishnu', email: 'vishnu@gmail.com', qualification: 'BSc ', Level: '3' },
  ]

  displayedColumns: string[] = ['id', 'name', 'email', 'qualification', 'level'];

}
