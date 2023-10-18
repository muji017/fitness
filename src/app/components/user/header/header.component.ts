import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userToken } from 'src/app/model/userModel';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  smallview: string = "hidden"
  mobileMenuActive: boolean = false;
  usertoken!:userToken

  constructor(private router: Router,
      private userService:UserService
    ) { 
  
  }

  ngOnInit(){
    const user:userToken|any = localStorage.getItem('token')
    const userparse=JSON.parse(user)
    console.log("dcdwscwdswdcds",userparse?.userToken)
    if(user){
      this.usertoken=user
    }
  }

   // Check if the current route is '/login'
  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  // Check if the current route is '/signup'
  isSignupRoute(): boolean {
    return this.router.url === '/signup'; 
  }

  isHomeRoute(): boolean {
    return this.router.url === '/home'; 
  }

  isTrainerRoute(): boolean {
    return this.router.url === '/trainers'; 
  }

  isDietRoute(): boolean {
    return this.router.url === '/dietplans'; 
  }

  isVideoRoute(): boolean {
    return this.router.url === '/videos'; 
  }

  isBmiRoute(): boolean {
    return this.router.url === '/bmicalculator'; 
  }
  isChat(): boolean {
    return this.router.url === '/chat'; 
  }

  onLogout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
  tog() {
    if (this.smallview == "") {
      this.smallview = "hidden"
      return
    }
    this.smallview = ""

  }
  getProfile(){
   this.userService.getProfile().subscribe(
    (res)=>{
      this.router.navigate(['/profile'])
  },
  (error)=>{
    console.log(error)
  }
   )
  }
}
