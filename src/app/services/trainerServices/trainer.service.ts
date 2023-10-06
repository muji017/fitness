import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {


  private apiUrl:string = 'http://localhost:3000';

  constructor( private http:HttpClient) { }


  login(email: string, password: string):Observable<any> {
    const payload = {email, password };
    return this.http.post<any>(`${this.apiUrl}/trainer/login`,payload); 
  } 
}

