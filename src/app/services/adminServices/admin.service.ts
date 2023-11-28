import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DietPlanList, PlanList, UserModel, VideoList, trainer, trainerlist, userlist } from 'src/app/model/userModel';
import { url } from '../endPoint';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl: string = url;

  constructor( private http:HttpClient) { }
  login(email: string, password: string):Observable<{ adminId: string, adminToken: string }> {
    const payload = {email, password };
    return this.http.post<{ adminId: string, adminToken: string }>(`${this.apiUrl}/admin/login`,payload); 
  } 
  sendOtp(email: string):Observable<string>{
    const payload  = {email}
    return this.http.post<string>(`${this.apiUrl}/admin/sendOtp`,payload)
  }
  verifyOtp(email: string,otp:string):Observable<{ email: string }>{
    const payload = {email,otp}
    return this.http.post<{ email: string }>(`${this.apiUrl}/admin/verifyOtp`,payload)
  }
  resendOtp(email: string):Observable<string>{
    const payload  = {email}
    return this.http.put<string>(`${this.apiUrl}/admin/resendOtp`,payload)
  }
  setPassword(email: string,password:string):Observable<{ adminId:string, adminToken:string }>{
     const payload  = {email,password}
     return this.http.put<{ adminId: string, adminToken:string }>(`${this.apiUrl}/admin/setPassword`,payload)
   }

  //  trainers api calls
  getTrainersList():Observable<trainerlist>{
    return this.http.get<trainerlist>(`${this.apiUrl}/admin/getTrainersList`)
  }
   changeTrainerStatus(trainerId:string):Observable<{ trainers: trainerlist }>{
    const payload={trainerId}
    return this.http.patch<{ trainers: trainerlist }>(`${this.apiUrl}/admin/changeTrainerStatus`,payload)
   }
   addTrainer(trainer:FormData):Observable<{message:string}>{
    return this.http.post<{message:string}>(`${this.apiUrl}/admin/addTrainer`,trainer)
   }

  //  users api calls

   getUsersList():Observable<userlist>{
    return this.http.get<userlist>(`${this.apiUrl}/admin/getUsersList`)
   }
   changeUserStatus(userId:string):Observable<userlist>{
    const payload={userId}
    return this.http.patch<userlist>(`${this.apiUrl}/admin/changeUserStatus`,payload)
   }

  //  
  getSubscribersList():Observable<userlist>{
    return this.http.get<userlist>(`${this.apiUrl}/admin/subscribers`)
  }
  //  plans api calls

  getPlans():Observable<PlanList>{
    return this.http.get<PlanList>(`${this.apiUrl}/admin/getPlans`)
  }

  addPlan(plan:FormData):Observable<{message:string}>{
    return this.http.post<{message:string}>(`${this.apiUrl}/admin/addPlan`,plan)
  }

  updatePlan(plan:FormData):Observable<{message:string}>{
    return this.http.put<{message:string}>(`${this.apiUrl}/admin/updatePlan`,plan)
  }
// diet plans
  getDietPlans():Observable<DietPlanList>{
    return this.http.get<DietPlanList>(`${this.apiUrl}/admin/getDietPlan`)
  }
  changePlanStatus(planId:string):Observable<any>{
    const payload={planId}
    return this.http.patch<any>(`${this.apiUrl}/admin/changePlanStatus`,payload)
   }

   changeDietPremium(planId:string):Observable<any>{
    const payload={planId}
    return this.http.patch<any>(`${this.apiUrl}/admin/changeDietPremium`,payload)
   }

   changeSubscribersStatus(userId:string):Observable<any>{
    const payload={userId}
    return this.http.patch<any>(`${this.apiUrl}/admin/changeSubscribersStatus`,payload)
   }

   changeDietPlanStatus(planId:string):Observable<any>{
    const payload={planId}
    return this.http.patch<any>(`${this.apiUrl}/admin/changeDietPlanStatus`,payload)
   }
  // videos 
  getVideos():Observable<VideoList>{
    return this.http.get<VideoList>(`${this.apiUrl}/admin/getVideos`)
  }

  changeVideoStatus(videoId:any):Observable<VideoList>{
    const payload={videoId}
    return this.http.patch<VideoList>(`${this.apiUrl}/admin/changeVideoStatus`,payload)
  }

  changeVideoPremium(videoId:any):Observable<VideoList>{
    const payload={videoId}
    return this.http.patch<VideoList>(`${this.apiUrl}/admin/changeVideoPremium`,payload)
  }
}
