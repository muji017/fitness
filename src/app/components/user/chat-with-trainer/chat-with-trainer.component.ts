import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { trainer } from 'src/app/model/userModel';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/userServices/user.service';
import { getTrainersListApi } from 'src/app/store/action';
import { getAllTrainers } from 'src/app/store/selector';
import { UserChatTrainerListDialogeComponent } from '../user-chat-trainer-list-dialoge/user-chat-trainer-list-dialoge.component';
import { MatDialog } from '@angular/material/dialog';
import { chatRoom } from 'src/app/model/chatModel';
import { Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat-with-trainer',
  templateUrl: './chat-with-trainer.component.html',
  styleUrls: ['./chat-with-trainer.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWithTrainerComponent {
  trainers!: trainer[]
  searchQuery!: string
  searchTrainer!: trainer[]
  activeTrainer!: any
  currentTrainer!: trainer | undefined
  showProfilePopup: boolean = false;
  page!: any
  chatRooms!: chatRoom[]
  message!: string
  currentRoom!: chatRoom | undefined
  chats:any| undefined
  chatData:any
  constructor(
    private service: UserService,
    private store: Store<trainer[]>,
    private router: Router,
    private chatService: ChatService,
    private dialoge: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.chatService.openChat()
    this.getTrainers()
  }
  getTrainers() {
    this.store.dispatch(getTrainersListApi())
    this.store.select(getAllTrainers).subscribe((res) => {
      const data = res.filter((data) => data.isVerified == true)
      this.chatService.getChatRooms().subscribe(
        (res) => {
          this.chatData = res.chatRooms
          this.chatRooms = res.chatRooms
          console.log("rooms", this.chatRooms);
          const trainerChatIds = this.chatRooms.map((chat) => chat.trainerId)
          this.trainers = data.filter((data) => trainerChatIds.includes(data.id))
          this.searchTrainer = data.filter((data) => trainerChatIds.includes(data.id))
          this.currentTrainer = this.trainers[0]
          this.currentRoom = this.chatData.find((room:any) => room.trainerId === this.currentTrainer?.id)
          this.getRoomMessages(this.currentRoom?._id)
        }
      )
    }) 
  }
  getRoomMessages(roomId: any) {
    if (roomId) {
      this.chatService.getAllChats(roomId).subscribe(
        (res)=>{
          this.chats=res.chats
          console.log("chat",this.chats);  
        }
      )
     
    }
  }
  openAddTrainer() {
    this.dialoge.open(UserChatTrainerListDialogeComponent, {
      enterAnimationDuration: 1200,
      exitAnimationDuration: 1200,
      minHeight: '300px',
      maxHeight: '400px',
      width: '350px'
    })
  }

  viewMessage(trainerId: any) {
    this.activeTrainer = trainerId
    this.store.select(getAllTrainers).subscribe((res) => {
      this.trainers = res
      this.currentTrainer = this.trainers.find((tr) => tr.id === trainerId)
      this.currentRoom = this.chatData.find((room:any) => room.trainerId === this.currentTrainer?.id)
      this.getRoomMessages(this.currentRoom?._id)
    })

  }
  sendMessage(trainerId: any) {
    if (!this.message) {
      this.toastr.warning("Message field is empty")
      return
    }
    const room:any=this.currentRoom
    this.chatService.sendMessage(room,this.currentRoom?._id, this.message).subscribe(
      (res) => {
        this.message = ''
        this.toastr.success(res.message)
      }
    )
  }
  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.trainers = this.searchTrainer.filter((tr) => {
      return tr.name.toLowerCase().includes(filterValue);
    });
  }
}
