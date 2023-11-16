import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
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
  users!: UserModel[]
  searchQuery!: string
  searchUser!: UserModel[]
  activeUser: any
  currentUser!: UserModel | undefined
  showProfilePopup: boolean = false;
  chats!: any
  message!: string
  chatRooms!: chatRoom[]
  currentRoom!: chatRoom | undefined
  userTyping: boolean = false
  notifications:any[]=[]
  constructor(
    private service: TrainerService,
    private store: Store<UserModel[]>,
    private router: Router,
    private chatService: ChatService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.chatService.openChatTrainer()
    this.getChats()
  }
  getChats() {
    this.chatService.getChatRoomsTrainer().subscribe(
      (res) => {
        this.chatRooms = res.chatRooms
        this.users = this.chatRooms.map((room) => room.userId)
        this.searchUser = this.chatRooms.map((room) => room.userId)
        this.chatRooms.forEach((chat) =>
        this.chatService.getAllChats(chat._id).subscribe(
          (res) => {
            const chats: any[] = res.chats;
            console.log("without filter", chats);
            const uniqueMessageIds = new Set(this.notifications.map(msg => msg._id));
            const newMessages = chats.filter(allMsg => !allMsg.is_read &&allMsg.senderType!=='Trainer' && !uniqueMessageIds.has(allMsg._id));
            this.notifications = this.notifications.concat(newMessages);
            console.log("with filter", this.notifications);
          }
        )
      );
        this.currentUser = this.users[0]
        this.currentRoom = this.chatRooms.find((room) => room.userId._id === this.currentUser?._id)
        this.getRoomMessages(this.currentRoom?._id)
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
        this.chatService.socket.on('typing progress', (roomId: any) => {

          if (roomId === this.currentRoom?._id) {
            this.userTyping = true
          }
        })
        this.chatService.socket.on('stop typing', () => {
          this.userTyping = false
        })
        this.chatService.socket.on('online', (userId: string) => {
          let status: boolean = true
          this.chatService.makeOnline(userId, status).subscribe(
            (res) => {
              const userToUpdate = this.users.find((data) => data._id == userId);
              if (userToUpdate) {
                userToUpdate.is_Online = status;
                this.cdr.detectChanges();
              }
            }
          )
        })
        this.chatService.socket.on('offline', (userId: string) => {
          let status: boolean = false
          this.chatService.makeOnline(userId, status).subscribe(
            (res) => {
              const userToUpdate = this.users.find((data) => data._id == userId);
              if (userToUpdate) {
                userToUpdate.is_Online = status;
                this.cdr.detectChanges();
              }
            }
          )

        })
      }
    )
  }
  getUnreadNotificationCount(userId: number): number {
    return this.notifications.filter(notification => 
      notification.sender === userId && !notification.is_read
    ).length;
  }
  getRoomMessages(roomId: any) {
    if (roomId) {
      this.chatService.getAllChatsTrainer(roomId).subscribe(
        (res) => {
          this.chats = res.chats
        }
      )

    }
  }
  viewMessage(userId: any) {
    this.activeUser = userId
    this.currentUser = this.users.find((user) => user._id === userId)
    this.currentRoom = this.chatRooms.find((room) => room.userId._id === this.currentUser?._id)
    this.notifications = this.notifications.filter(chat => chat.room !== this.currentRoom?._id)
    const roomId:string|undefined=this.currentRoom?._id
    this.chatService.messageReadTrainer(roomId).subscribe(
      (res)=>{
        console.log(res);      
      }
    )
    console.log("nononononononononononon", this.notifications);
    this.getRoomMessages(this.currentRoom?._id)
  }

  sendMessage() {
    if (!this.message) {
      this.toastr.warning("Message field is empty")
      return
    }
    const room: any = this.currentRoom
    this.chatService.sendMessageTrainer(room, this.currentRoom?._id, this.message).subscribe(
      (res) => {
        this.message = ''
      }
    )
  }
  typing() {
    this.chatService.trainerTyping(this.currentRoom?._id)
  }
  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.users = this.searchUser.filter((user) => {
      return user.name.toLowerCase().includes(filterValue);
    });
  }


  versions = [{
    width: '20px',
    height: '5px',
    color: '#74b9ff'
  }];

  ngOnDestroy() {
  }
}
