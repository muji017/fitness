import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import * as socketIo from "socket.io-client";
import { UserService } from './userServices/user.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { chatRoom, chatRooms } from '../model/chatModel';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  user: any = localStorage.getItem('usertoken')
  userParse = JSON.parse(this.user)
  userId = this.userParse?.userId
  trainer: any = localStorage.getItem('trainerToken')
  pars: any = JSON.parse(this.trainer)
  trainerId = this.pars?.trainerId
  socket!: any
  apiUrl: any = 'http://localhost:3000'
  userSocketConnected!: boolean
  isUserTyping!: boolean
  constructor(private http: HttpClient) {
  }
  // user side chat 
  public openChat() {
    this.socket = socketIo.connect(this.apiUrl)
    this.socket.emit('setup', this.userId)
    this.socket.on('connected', () => this.userSocketConnected = true)
    this.socket.on('typing', () => this.isUserTyping = true)
    this.socket.on('stop typing', () => this.isUserTyping = false)
  
  }

  public userTyping(roomId: any) {
    if (!this.userSocketConnected) return
    if (!this.isUserTyping) {
      console.log("typing roomId", roomId);
      this.isUserTyping = true
      this.socket.emit('typing', roomId)
      this.socket.on('typing progress',(roomId:string)=>{
        console.log("insode open chat",roomId);
        
           })
    }
    let lastTypingtime = new Date().getTime();
    let timer = 3000
    setTimeout(() => {
      let timeNow = new Date().getTime()
      let timeDiff = timeNow - lastTypingtime
      if (timeDiff >= timer && this.isUserTyping) {
        this.socket.emit("stop typing", roomId)
        console.log("stop typing roomid", roomId);
        this.isUserTyping = false
      }
    }, timer)
  }
public getTrainerStatus(){

}
  public getChatRooms(): Observable<chatRooms> {
    this.socket.on('message received', (chat: any) => {
      console.log("message user res", chat);

    })
    return this.http.get<chatRooms>(`${this.apiUrl}/getChatRooms`)
  }
  public getRoomUser(trainerId: any): Observable<any> {
    const params = new HttpParams().set('trainerId', trainerId);
    return this.http.get(`${this.apiUrl}/getRoomUser`, { params })
  }

  public getAllChats(roomId: any): Observable<any> {
    const params = new HttpParams().set('roomId', roomId)
    this.socket.emit("join chat", roomId)
    return this.http.get<any>(`${this.apiUrl}/getAllChats`, { params })
  }

  public sendMessage(room: chatRoom, roomId: any, message: String,): Observable<any> {
    console.log('sendMessage: ', message)
    const payload = { roomId, message }
    return this.http.post<any>(`${this.apiUrl}/sendMessage`, payload).pipe(
      switchMap((apiResponse) => {
        console.log("send message", apiResponse.chat);

        this.socket.emit('new message', room, 'User', apiResponse.chat);
        return of(apiResponse);
      }))
  }

  // trainer side chat 

  public openChatTrainer() {
    this.socket = socketIo.connect(this.apiUrl)
    this.socket.emit('setup', this.trainerId)
    this.socket.on('connected', () => this.userSocketConnected = true)
    this.socket.on('trainer typing', () => this.isUserTyping = true)
    this.socket.on('trainer stop typing', () => this.isUserTyping = false)
  }

  public trainerTyping(roomId: any) {
    if (!this.userSocketConnected) return
    if (!this.isUserTyping) {
      console.log("trainer typing roomId", roomId);
      this.isUserTyping = true
      this.socket.emit("trainer typing", roomId)
      this.socket.on('trainer typing progress',(roomId:string)=>{
        console.log("insode open chat",roomId);
        
           })
    }
    let lastTypingtime = new Date().getTime();
    let timer = 3000
    setTimeout(() => {
      let timeNow = new Date().getTime()
      let timeDiff = timeNow - lastTypingtime
      if (timeDiff >= timer && this.isUserTyping) {
        this.socket.emit("trainer stop typing", roomId)
        console.log("trainer stop typing roomid", roomId);
        this.isUserTyping = false
      }
    }, timer)


  }

  public typingStatus() {

  }
  public getChatRoomsTrainer(): Observable<chatRooms> {
    this.socket.on('message received', (chat: any) => {
      console.log("inside reciverd trai", chat);

    })
    return this.http.get<chatRooms>(`${this.apiUrl}/trainer/getChatRooms`)
  }

  public getAllChatsTrainer(roomId: any): Observable<any> {
    const params = new HttpParams().set('roomId', roomId)
    this.socket.emit("join chat", roomId)
    return this.http.get<any>(`${this.apiUrl}/trainer/getAllChats`, { params })
  }

  public sendMessageTrainer(room: chatRoom, roomId: any, message: String,): Observable<any> {
    console.log('inside send message in trainer ')
    console.log('sendMessage: ', message)
    const payload = { roomId, message }
    return this.http.post<any>(`${this.apiUrl}/sendMessage`, payload).pipe(
      switchMap((apiResponse) => {
        console.log("send message", apiResponse.chat);

        this.socket.emit('new message', room, 'Trainer', apiResponse.chat);
        return of(apiResponse);
      }))
  }
}

