import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/model/userModel';
import { TrainerService } from 'src/app/services/trainerServices/trainer.service';

@Component({
  selector: 'app-chat-with-user',
  templateUrl: './chat-with-user.component.html',
  styleUrls: ['./chat-with-user.component.css']
})
export class ChatWithUserComponent {
  users!: UserModel[]
  searchQuery!:string
  searchUser!:UserModel[]
  activeUser:any
  currentUser!:UserModel|undefined
  constructor(private service: TrainerService
    , private store: Store<UserModel[]>,
   private router:Router
  ) { }

}
