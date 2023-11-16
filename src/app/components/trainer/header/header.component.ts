import { Component, ViewEncapsulation ,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  @Input() notification:any[]=[]
  smallview: string = "hidden"
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

  tog() {
    if (this.smallview == "") {
      this.smallview = "hidden"
      return
    }
    this.smallview = ""

  }
}
