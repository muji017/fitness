import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  smallview:string="hidden"
  mobileMenuActive: boolean = false;

  navLinks: { path: string; label: string }[] = [
    { path: '/home', label: 'Home' },
    { path: '/team', label: 'Team' },
    { path: '/projects', label: 'Projects' },
    { path: '/calendar', label: 'Calendar' },
  ];

  constructor(private router: Router) {}

  toggleMobileMenu(): void {
    this.mobileMenuActive=!this.mobileMenuActive
  }

  isLinkActive(path: string): boolean {
    return this.router.isActive(path, true);
  }



  onLogout(){

  }
tog(){
    if(this.smallview==""){
      this.smallview="hidden"
      return
    }
    this.smallview=""

  }
}
