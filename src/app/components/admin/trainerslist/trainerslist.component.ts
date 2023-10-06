import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-trainerslist',
  templateUrl: './trainerslist.component.html',
  styleUrls: ['./trainerslist.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class TrainerslistComponent {

  dataSource=[
    
  { No: '1', name: 'Mujeeb', email: 'muji@gmaiil.com' ,qualification:'BSc ',Level:'3'},
  { No: '2', name: 'Vishnu', email: 'vishnu@gmail.com' ,qualification:'BSc ',Level:'3'},
  ]
  
  displayedColumns: string[] = ['id', 'name', 'email','qualification','level'];
  
}
