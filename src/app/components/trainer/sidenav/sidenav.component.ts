import { Component, ViewEncapsulation,Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class SidenavComponent {
  @Input() notifications:any[]=[]
  constructor(){
    
  }
}
