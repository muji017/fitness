import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/model/userModel';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { changeUserStatusApi, getUsersListApi } from 'src/app/store/action';
import { getAllUsers } from 'src/app/store/selector';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent {

  searchQuery!: string
  userList!: UserModel
  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>();

  displayedColumns: string[] = ['image', 'name', 'email', 'options'];
  constructor(
    private adminService: AdminService,
    private store: Store<UserModel[]>
  ) { }

  ngOnInit() {
    this.store.dispatch(getUsersListApi())
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
    this.store.dispatch(changeUserStatusApi({ userId }))
    this.getUsers()
  }
}


