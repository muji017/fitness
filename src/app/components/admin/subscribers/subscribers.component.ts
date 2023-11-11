import { Component,ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/model/userModel';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { changeSubscribersStatusApi, changeUserStatusApi, getSubscriberListApi } from 'src/app/store/action';
import { getAllUsers } from 'src/app/store/selector';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class SubscribersComponent {
  searchQuery!: string
  userList!: UserModel
  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>();

  displayedColumns: string[] = ['image', 'name', 'email','subscriptionPlan','amount','subscriptionDate','expiryDate', 'options'];
  constructor(
    private adminService: AdminService,
    private store: Store<UserModel[]>,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
    this.store.dispatch(getSubscriberListApi())
    this.getUsers()
  }

  getUsers() {
    this.store.select(getAllUsers).subscribe((res) => {
      this.dataSource.data = res;
    }
    )
  }
  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  changeStatus(userId:any) {
    this.store.dispatch(changeSubscribersStatusApi({ userId }))
    this.getUsers()
    this.toastr.success("successfully Updated")
  }
}
