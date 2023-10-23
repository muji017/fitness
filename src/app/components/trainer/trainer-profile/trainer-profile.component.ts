
import { Component ,ViewEncapsulation } from '@angular/core';
import { trainer } from 'src/app/model/userModel';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class TrainerProfileComponent {
 
  trainer!:trainer
  constructor(){
    
  }
}
