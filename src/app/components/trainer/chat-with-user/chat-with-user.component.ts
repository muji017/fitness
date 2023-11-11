import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { chatRoom } from 'src/app/model/chatModel';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/services/chat.service';
import { TrainerService } from 'src/app/services/trainerServices/trainer.service';

@Component({
  selector: 'app-chat-with-user',
  templateUrl: './chat-with-user.component.html',
  styleUrls: ['./chat-with-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatWithUserComponent {
  users!:UserModel[]
  searchQuery!: string
  searchUser!: UserModel[]
  activeUser: any
  currentUser!: UserModel | undefined
  showProfilePopup: boolean = false;
  chats!: any
  message!: string
  chatRooms!: chatRoom[]
  currentRoom!:chatRoom|undefined
  constructor(
    private service: TrainerService,
    private store: Store<UserModel[]>,
    private router: Router,
    private chatService:ChatService,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
    this.chatService.openChatTrainer()
    this.getChats()
  }
  getChats(){
  this.chatService.getChatRoomsTrainer().subscribe(
    (res)=>{
      console.log(res.chatRooms);
         this.chatRooms=res.chatRooms 
         this.users=this.chatRooms.map((room)=>room.userId)
         this.searchUser=this.chatRooms.map((room)=>room.userId)
         this.currentUser=this.users[0]
         this.currentRoom=this.chatRooms.find((room)=>room.userId._id===this.currentUser?._id)
         this.getRoomMessages(this.currentRoom?._id)
    }
  )
  }

  getRoomMessages(roomId: any) {
    if (roomId) {
      this.chatService.getAllChatsTrainer(roomId).subscribe(
        (res)=>{
          this.chats=res.chats
          console.log(this.chats);  
        }
      )
     
    }
  }
  viewMessage(userId: any) {
    this.activeUser = userId
    this.currentUser=this.users.find((user)=>user._id===userId)
    this.currentRoom=this.chatRooms.find((room)=>room.userId._id===this.currentUser?._id)
    this.getRoomMessages(this.currentRoom?._id)
  }

  sendMessage() {
    if (!this.message) {
      this.toastr.warning("Message field is empty")
      return
    }
    const room:any=this.currentRoom
    this.chatService.sendMessageTrainer(room,this.currentRoom?._id, this.message).subscribe(
      (res) => {
        this.message = ''
        this.toastr.success(res.message)
      }
    )
  }
  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.users = this.searchUser.filter((user) => {
      return user.name.toLowerCase().includes(filterValue);
    });
  }
}
