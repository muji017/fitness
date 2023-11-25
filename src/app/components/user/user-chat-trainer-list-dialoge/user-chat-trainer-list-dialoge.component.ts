import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { trainer } from 'src/app/model/userModel';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/userServices/user.service';
import { getAllTrainers } from 'src/app/store/selector';

@Component({
  selector: 'app-user-chat-trainer-list-dialoge',
  templateUrl: './user-chat-trainer-list-dialoge.component.html',
  styleUrls: ['./user-chat-trainer-list-dialoge.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class UserChatTrainerListDialogeComponent {
  trainer$!:Observable<trainer[]>; 
  apiUrl!:string
  constructor(
    private store:Store<trainer[]>,
    private userService:UserService,
    private chatService:ChatService,
    private dialoge:MatDialog
  ){
    this.apiUrl=userService.getapiUrl()
  }

  ngOnInit(){
   this.trainer$=this.store.select(getAllTrainers)
  }
  addRoom(trainerId:any){
    this.chatService.getRoomUser(trainerId).subscribe(
      (res)=>{
        this.dialoge.closeAll()
        window.location.reload()
      }
    )
  }
}
