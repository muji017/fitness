import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userToken } from 'src/app/model/userModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  smallview: string = "hidden"
  mobileMenuActive: boolean = false;
  usertoken!:userToken

  constructor(private router: Router) { 
  
  }

  ngOnInit(){
    const user:userToken|any = localStorage.getItem('token')
    // console.log("dcdwscwdswdcds",usertoken)
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
}
