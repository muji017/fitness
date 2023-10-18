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
    private userservice:UserService
  ) {}
  
 
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> { 
    const user:any= localStorage.getItem('token')
    if(user){
    const userparse=JSON.parse(user)
    console.log("get user token",userparse.userToken)
    const token=userparse?.userToken
    const modifiedReq = req.clone({
      
      headers: req.headers.set('Authorization',`Bearer ${token}` ),
    });

    return next.handle(modifiedReq);
  }
  return next.handle(req)
}
  
}