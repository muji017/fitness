import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  checkLogin(): Observable<boolean> {
    const isLoggedIn = !!localStorage.getItem('token');

    return new Observable<boolean>((observer) => {
      observer.next(isLoggedIn);
      observer.complete();
    });
  }
}