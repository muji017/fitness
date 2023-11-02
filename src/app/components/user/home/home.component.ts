import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/model/userModel';
import { getUserDetailsApi } from 'src/app/store/action';
import { getAllUsers } from 'src/app/store/selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private store:Store<UserModel>
  ){}

  ngOnInit(){
    this.store.dispatch(getUserDetailsApi())
    this.store.select(getAllUsers).subscribe((res) => {
      console.log("user home",res)
    })
  }
}
