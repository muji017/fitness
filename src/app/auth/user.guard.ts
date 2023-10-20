import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import {Observable, map} from "rxjs"
import { UserAuthService } from "./userAuth.service";

export const UserhomeAuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authService = inject(UserAuthService);
    const router = inject(Router);
    return authService.checkLogin().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          console.log("inside auth function");
          
          return true;
        } else {
          router.navigate(['/login']);
          return false;
        }
      })
    );
  };

  export const UserLoginAuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authService = inject(UserAuthService);
    const router = inject(Router);
    return authService.checkLogin().pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          return true;
        } else {
          router.navigate(['/home']);
          return false;
        }
      })
    );
  };
