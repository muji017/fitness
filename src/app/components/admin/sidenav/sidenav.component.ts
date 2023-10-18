import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class SidenavComponent {

  constructor(private router:Router)
  {
      
  }

  isHomeRoute(): boolean {
    return this.router.url==='/admin/home';
  }
}
