import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { trainer } from 'src/app/model/userModel';
import { UserService } from 'src/app/services/userServices/user.service';
import { getTrainersListApi } from 'src/app/store/action';
import { getAllTrainers } from 'src/app/store/selector';

@Component({
  selector: 'app-chat-with-trainer',
  templateUrl: './chat-with-trainer.component.html',
  styleUrls: ['./chat-with-trainer.component.css']
})
export class ChatWithTrainerComponent {
  trainers!: trainer[]
  searchQuery!:string
  searchTrainer!:trainer[]
  activeTrainer:any
  currentTrainer!:trainer|undefined
  constructor(private service: UserService
    , private store: Store<trainer[]>,
   private router:Router
  ) { }

  ngOnInit() {

    this.store.dispatch(getTrainersListApi())
    this.store.select(getAllTrainers).subscribe((res)=>{
      const data=res
      this.trainers=data.filter((data)=>data.isVerified==true)
      this.searchTrainer=data.filter((data)=>data.isVerified==true)
    })
  }

  viewMessage(trainerId:any){
      this.activeTrainer=trainerId
      this.store.select(getAllTrainers).subscribe((res) => {
        this.trainers=res
        this.currentTrainer=this.trainers.find((tr)=>tr.id===trainerId)
  })
}

  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.trainers = this.searchTrainer.filter((tr) => {
      return tr.name.toLowerCase().includes(filterValue);
    });
  }
}
