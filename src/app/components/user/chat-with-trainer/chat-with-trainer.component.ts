import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None
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
  chats: any | undefined
  chatData: any
  trainerTyping: boolean = false
  notifications: any[]= []
  constructor(
    private service: UserService,
    private store: Store<trainer[]>,
    private router: Router,
    private chatService: ChatService,
    private dialoge: MatDialog,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
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
          const trainerChatIds = this.chatRooms.map((chat) => chat.trainerId)
          this.trainers = data.filter((data) => trainerChatIds.includes(data.id))
          this.searchTrainer = data.filter((data) => trainerChatIds.includes(data.id))
          this.chatRooms.forEach((chat) =>
            this.chatService.getAllChats(chat._id).subscribe(
              (res) => {
                const chats: any[] = res.chats;
                console.log("without filter", chats);
                const uniqueMessageIds = new Set(this.notifications.map(msg => msg._id));
                const newMessages = chats.filter(allMsg => !allMsg.is_read &&allMsg.senderType!=='User' && !uniqueMessageIds.has(allMsg._id));
                this.notifications = this.notifications.concat(newMessages);
                console.log("with filter", this.notifications);
              }
            )
          );
          this.currentTrainer = this.trainers[0]
          this.currentRoom = this.chatData.find((room: any) => room.trainerId === this.currentTrainer?.id)
          this.getRoomMessages(this.currentRoom?._id)
          this.chatService.socket.off('message received');
          this.chatService.socket.on('message received', (chat: any) => {
            if (chat.room !== this.currentRoom?._id) {
              if (!this.notifications.includes(chat)) {
                console.log(chat);
                this.notifications = this.notifications.concat(chat);
              }
            }
            else {
              this.chats.unshift(chat);
              this.cdr.detectChanges();
            }
          });

          this.chatService.socket.on('trainer typing progress', (roomId: any) => {
            if (roomId === this.currentRoom?._id) {
              this.trainerTyping = true
            }
          })
          this.chatService.socket.on('trainer stop typing', () => {
            this.trainerTyping = false
          })
          this.chatService.socket.on('online', (userId: string) => {
            let status: boolean = true
            this.chatService.makeOnlineTrainer(userId, status).subscribe(
              (res) => {
                const userToUpdate = this.trainers.find((data) => data.id == userId);
                if (userToUpdate) {
                  const updatedUser = { ...userToUpdate, is_Online: status };
                  const index = this.trainers.indexOf(userToUpdate);
                  this.trainers[index] = updatedUser;
                  this.cdr.detectChanges();
                }
              }
            )
          })
          this.chatService.socket.on('offline', (userId: string) => {
            let status: boolean = false
            this.chatService.makeOnlineTrainer(userId, status).subscribe(
              (res) => {
                const userToUpdate = this.trainers.find((data) => data.id == userId);
                if (userToUpdate) {
                  const updatedUser = { ...userToUpdate, is_Online: status };
                  const index = this.trainers.indexOf(userToUpdate);
                  this.trainers[index] = updatedUser;
                  this.cdr.detectChanges();
                }
              }
            )
          })
        }
      )
    })
  }
  getUnreadNotificationCount(trainerId: number): number {
    return this.notifications.filter(notification => 
      notification.sender === trainerId && !notification.is_read
    ).length;
  }
  getRoomMessages(roomId: any) {
    if (roomId) {
      this.chatService.getAllChats(roomId).subscribe(
        (res) => {
          this.chats = res.chats
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
      const trainers = res
      this.currentTrainer = trainers.find((tr) => tr.id === trainerId)
      this.currentRoom = this.chatData.find((room: any) => room.trainerId === this.currentTrainer?.id)
      this.notifications = this.notifications.filter(chat => chat.room !== this.currentRoom?._id)
      const roomId:string|undefined=this.currentRoom?._id
      this.chatService.messageRead(roomId).subscribe(
        (res)=>{
          console.log(res);      
        }
      )
      console.log("nononononononononononon", this.notifications);
      this.getRoomMessages(this.currentRoom?._id)
    })

  }
  sendMessage(trainerId: any) {
    if (!this.message) {
      this.toastr.warning("Message field is empty")
      return
    }
    const room: any = this.currentRoom
    this.chatService.sendMessage(room, this.currentRoom?._id, this.message).subscribe(
      (res) => {
        this.message = ''
      }
    )
  }
  typing() {
    this.chatService.userTyping(this.currentRoom?._id)

  }
  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.trainers = this.searchTrainer.filter((tr) => {
      return tr.name.toLowerCase().includes(filterValue);
    });
  }
  versions = [{
    width: '20px',
    height: '5px',
    color: '#74b9ff'
  }];
}
