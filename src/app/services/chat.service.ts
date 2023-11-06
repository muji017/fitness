import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as socketIo from "socket.io-client";
import { UserService } from './userServices/user.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { chatRoom, chatRooms } from '../model/chatModel';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  user:any = localStorage.getItem('usertoken')
  userParse=JSON.parse(this.user)
  userId=this.userParse.userId
  trainer:any = localStorage.getItem('trainerToken')
  pars:any=JSON.parse(this.trainer)
  trainerId=this.pars.trainerId
  socket!: any
  apiUrl:any='http://localhost:3000'
  constructor(private http:HttpClient ) {
  }
  // user side chat 
  public openChat() {
    this.socket = socketIo.connect(this.apiUrl)
    this.socket.emit('setup',this.userId)
  }

  public getChatRooms():Observable<chatRooms>{
    this.socket.on('message received',()=>{
      console.log("message user res");
      
    })
   return this.http.get<chatRooms>(`${this.apiUrl}/getChatRooms`)
  }
  public getRoomUser(trainerId:any):Observable<any>{
    const params = new HttpParams().set('trainerId', trainerId);
     return this.http.get(`${this.apiUrl}/getRoomUser`,{params})
  }

  public getAllChats(roomId:any):Observable<any>{
   const params = new HttpParams().set('roomId',roomId)
   this.socket.emit("join chat",roomId)
   return this.http.get<any>(`${this.apiUrl}/getAllChats`,{params})
  }

  public sendMessage(room:chatRoom,roomId:any,message:String,):Observable<any>{
    console.log('sendMessage: ', message)
    const payload={roomId,message}
    this.socket.emit('new message',room,'User' );
    return this.http.post<any>(`${this.apiUrl}/sendMessage`,payload)
  }

  // trainer side chat 

  public openChatTrainer() {
    this.socket = socketIo.connect(this.apiUrl)
    this.socket.emit('setup',this.trainerId)
  }

  public getChatRoomsTrainer():Observable<chatRooms>{
    this.socket.on('message received',()=>{
      console.log("inside reciverd trai");
      
    })
    return this.http.get<chatRooms>(`${this.apiUrl}/trainer/getChatRooms`)
   }

   public getAllChatsTrainer(roomId:any):Observable<any>{
    const params = new HttpParams().set('roomId',roomId)
    this.socket.emit("join chat",roomId)
    return this.http.get<any>(`${this.apiUrl}/trainer/getAllChats`,{params})
   }

   public sendMessageTrainer(room:chatRoom,roomId:any,message:String,):Observable<any>{
    console.log('sendMessage: ', message)
    const payload={roomId,message}
    this.socket.emit('new message',room,'Trainer' );
    return this.http.post<any>(`${this.apiUrl}/sendMessage`,payload)
  }
}
