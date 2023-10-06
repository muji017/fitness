import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
   console.log(email)
    const payload  = {email}
    return this.http.put<any>(`${this.apiUrl}/admin/resendOtp`,payload)
  }
  setPassword(email: string,password:string):Observable<any>{
    console.log(email)
     const payload  = {email,password}
     return this.http.put<any>(`${this.apiUrl}/admin/setPassword`,payload)
   }
}
