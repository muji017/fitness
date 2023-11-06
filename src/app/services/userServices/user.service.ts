import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DietPlanList, PlanList, PlansModel, UserModel, VideoList, trainerlist, userToken } from 'src/app/model/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
   private apiUrl:string = 'http://localhost:3000';
  constructor( private http:HttpClient) { }

  getapiUrl():string{
    return this.apiUrl+'/public/images/'
  }
  signup(name:string,email: string, password: string):Observable<userToken> {
    const payload = {name, email, password };
    return this.http.post<userToken>(`${this.apiUrl}/signup`,payload); 
  } 
  login(email: string, password: string):Observable<userToken> {

    const payload = {email, password };
    return this.http.post<userToken>(`${this.apiUrl}/login`,payload); 
  } 
  verifyOtp(email: string,otp:string):Observable<userToken>{
    const payload = {email,otp}
    return this.http.post<userToken>(`${this.apiUrl}/verifyOtp`,payload)
  }
  resendOtp(email: string):Observable<string>{
    const payload  = {email}
    return this.http.put<string>(`${this.apiUrl}/resendOtp`,payload)
  }

  sendOtp(email: string):Observable<string>{
    const payload  = {email}
    return this.http.post<string>(`${this.apiUrl}/sendOtp`,payload)
  }

  getTrainersList():Observable<trainerlist>{
    return this.http.get<trainerlist>(`${this.apiUrl}/trainerslist`)
  }
  getProfile():Observable<UserModel>{
    return this.http.get<UserModel>(`${this.apiUrl}/getProfile`)
  }

  getPlans():Observable<PlanList>{
    return this.http.get<PlanList>(`${this.apiUrl}/getPlans`)
  }

  createSubscription(planId:string):Observable<any>{
    const payload  = {planId}
    return this.http.post<any>(`${this.apiUrl}/createSubscription`,payload)
  }

  paymentss(planId:any,paymentMethod:any):Observable<any>{
  
    const payload ={planId,paymentMethod}
    return this.http.post<any>(`${this.apiUrl}/processPayment`,payload)
  }

  setPassword(email: string,password:string):Observable<any>{
     const payload  = {email,password}
     return this.http.put<any>(`${this.apiUrl}/setPassword`,payload)
   }

   uploadPic(form:FormData):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/uploadPic`,form)
   }

   changeName(name:string):Observable<any>{
    const payload={name}
    return this.http.put<any>(`${this.apiUrl}/changeName`,payload)
   }

   changePassword(password:string):Observable<any>{
    const payload={password}
    return this.http.put<any>(`${this.apiUrl}/changePassword`,payload)
   }

   getDietPlans(): Observable<DietPlanList> {
    return this.http.get<DietPlanList>(`${this.apiUrl}/getDietPlans`)
  }

  getVideos(): Observable<VideoList> {
    return this.http.get<VideoList>(`${this.apiUrl}/getVideos`)
  }

  
}
