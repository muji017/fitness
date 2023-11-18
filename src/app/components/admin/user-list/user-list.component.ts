import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/model/userModel';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { changeUserStatusApi, getUsersListApi } from 'src/app/store/action';
import { getAllUsers } from 'src/app/store/selector';
import { MatPaginator } from '@angular/material/paginator';

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
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(
    private adminService: AdminService,
    private store: Store<UserModel[]>,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
    this.store.dispatch(getUsersListApi())
    this.getUsers()
    this.dataSource.paginator = this.paginator;
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
    this.toastr.success("successfully Updated")
  }
}


