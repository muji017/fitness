import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            this.router.navigate(['/error'], {
              queryParams: { code: '404' },
            });
          } else if(error.status === 500) {
            this.router.navigate(['/error'], {
              queryParams: { code: '500' },
            });
          }
        } 
        console.log(error);
        
        return throwError(error);
      })
    );
  }
}