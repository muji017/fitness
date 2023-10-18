import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlansModel, UserModel, trainerlist, userToken } from 'src/app/model/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
   private apiUrl:string = 'http://localhost:3000';
  constructor( private http:HttpClient) { }

  signup(name:string,email: string, password: string):Observable<userToken> {
    console.log(name)
    const payload = {name, email, password };
    return this.http.post<userToken>(`${this.apiUrl}/signup`,payload); 
  } 
  login(email: string, password: string):Observable<userToken> {
    console.log("in loginservice")
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
    console.log("get profile sevice");
    
    return this.http.get<UserModel>(`${this.apiUrl}/getProfile`)
  }

  getPlans():Observable<PlansModel>{
    return this.http.get<PlansModel>(`${this.apiUrl}/getPlans`)
  }

  createSubscription(planId:string):Observable<any>{
    const payload  = {planId}
    return this.http.post<any>(`${this.apiUrl}/createSubscription`,payload)
  }

  paymentss(planId:any,paymentMethod:any):Observable<any>{
    console.log("inside payment process");
    
    const payload ={planId,paymentMethod}
    return this.http.post<any>(`${this.apiUrl}/processPayment`,payload)
  }

}
