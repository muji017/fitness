import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {


  constructor(
    private router:Router
  ){}

  isloginRoute(){
    return this.router.url!==('/trainer/login')
  }
  onLogout(){
    localStorage.removeItem('trainerToken')
    this.router.navigate(['/trainer/login'])
  }
}
