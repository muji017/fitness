import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './userServices/user.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    private userservice: UserService
  ) { }


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user: any = localStorage.getItem('usertoken')
    const trainer: any = localStorage.getItem('trainerToken')
    const admin: any = localStorage.getItem('admintoken')
  
  // Check for the trainer token first
  if (window.location.pathname.includes('/trainer') && trainer) {
    const trainerparse = JSON.parse(trainer);
    const token = trainerparse?.trainerToken;
    console.log("interceptor trainer", token);

    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(modifiedReq);
  }
  else if (window.location.pathname.includes('/admin') && admin) {
    const adminparse = JSON.parse(admin);
    const token = adminparse?.adminToken;
    console.log("interceptor admin", token);
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(modifiedReq);
  }
  else if (window.location.pathname.includes('/') && user) {
    const userparse = JSON.parse(user);
    const token = userparse?.userToken;
    console.log("interceptor user", token);
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(modifiedReq);
  }
    return next.handle(req)
  }

}