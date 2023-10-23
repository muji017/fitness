import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanList, UserModel, trainer, userlist } from 'src/app/model/userModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl:string = 'http://localhost:3000';

  constructor( private http:HttpClient) { }



  login(email: string, password: string):Observable<any> {
    const payload = {email, password };
    return this.http.post<any>(`${this.apiUrl}/admin/login`,payload); 
  } 
  sendOtp(email: string):Observable<any>{
    const payload  = {email}
    return this.http.post<any>(`${this.apiUrl}/admin/sendOtp`,payload)
  }
  verifyOtp(email: string,otp:string):Observable<any>{
    const payload = {email,otp}
    return this.http.post<any>(`${this.apiUrl}/admin/verifyOtp`,payload)
  }
  resendOtp(email: string):Observable<any>{
    const payload  = {email}
    return this.http.put<any>(`${this.apiUrl}/admin/resendOtp`,payload)
  }
  setPassword(email: string,password:string):Observable<any>{
     const payload  = {email,password}
     return this.http.put<any>(`${this.apiUrl}/admin/setPassword`,payload)
   }

  //  trainers api calls
   changeTrainerStatus(trainerId:string):Observable<any>{
    const payload={trainerId}
    return this.http.put<any>(`${this.apiUrl}/admin/changeTrainerStatus`,payload)
   }
   addTrainer(trainer:FormData):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/admin/addTrainer`,trainer)
   }

  //  users api calls

   getUsersList():Observable<userlist>{
    return this.http.get<userlist>(`${this.apiUrl}/admin/getUsersList`)
   }
   changeUserStatus(userId:string):Observable<any>{
    const payload={userId}
    return this.http.put<any>(`${this.apiUrl}/admin/changeUserStatus`,payload)
   }

  //  plans api calls

  getPlans():Observable<PlanList>{
    return this.http.get<PlanList>(`${this.apiUrl}/admin/getPlans`)
  }

  addPlan(plan:FormData):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/admin/addPlan`,plan)
  }

  updatePlan(plan:FormData):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/admin/updatePlan`,plan)
  }

  changePlanStatus(planId:string):Observable<any>{
    const payload={planId}
    return this.http.put<any>(`${this.apiUrl}/admin/changePlanStatus`,payload)
   }

}
