import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel, userToken } from 'src/app/model/userModel';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  
  user!:UserModel
  constructor(
    private userService:UserService,
    private router:Router
  ){
    
  }

  ngOnInit(){
    this.userService.getProfile().subscribe(
      (res:any)=>{
        this.user=res.user
    },
    (error)=>{
      console.log(error)
    }
     )
     
  }

  subscribe(){
    this.router.navigate(['/subscription'])
  }
}
