import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  constructor(private router:Router){}

  onLogout(){
    localStorage.removeItem('token')
    this.router.navigate(['/admin/login'])
  }

  isloginRoute(){
    return this.router.url!=='/admin/login'
  }

  
}
