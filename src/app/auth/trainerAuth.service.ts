import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerAuthService {

  checkLogin(): Observable<boolean> {
    const isLoggedIn = !!localStorage.getItem('trainerToken');

    return new Observable<boolean>((observer) => {
      observer.next(isLoggedIn);
      observer.complete();
    });
  }
}