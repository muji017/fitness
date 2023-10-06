import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userToken } from 'src/app/model/userModel';

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
}
