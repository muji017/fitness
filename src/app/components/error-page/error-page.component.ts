import { Component,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ErrorPageComponent {

    constructor(
      private router:Router
    ){}
    redirect(){
      if(window.location.pathname.includes('/trainer') ){
        this.router.navigate(['/trainer'])
        return
      }
      else if(window.location.pathname.includes('/admin') ){
        this.router.navigate(['/admin'])
        return
      }
      else if(window.location.pathname.includes('/') ){
        this.router.navigate(['/'])
        return
      }
    }
}
