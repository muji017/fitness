import { Component, ViewEncapsulation ,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() notification:any[]=[]
  smallview: string = "hidden"
  subscriptions:Subscription[]=[]
  constructor(
    private router:Router,
    private chatService:ChatService
  ){}

  isloginRoute(){
    
    return this.router.url!==('/trainer/login')
  }
  onLogout(){

      const token:any=localStorage.getItem('trainerToken')
      const str:any=JSON.parse(token)
      const userId:string=str.trainerId
      const status:boolean=false
      const userStatusChange=this.chatService.makeOnlineTrainer(userId,status).subscribe(
        (res)=>{
          if(res){
            localStorage.removeItem('trainerToken')
            this.router.navigate(['/trainer/login'])
        }}
      )
      this.subscriptions.push(userStatusChange)

  }

  tog() {
    if (this.smallview == "") {
      this.smallview = "hidden"
      return
    }
    this.smallview = ""

  }
}
