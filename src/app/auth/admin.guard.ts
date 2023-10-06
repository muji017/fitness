import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import {Observable, map} from "rxjs"
import { AdminAuthService } from "./adminAuth.service";

export const AdminhomeAuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authService = inject(AdminAuthService);
    const router = inject(Router);
    return authService.checkLogin().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true;
        } else {
          router.navigate(['/admin/login']);
          return false;
        }
      })
    );
  };

  export const AdminLoginAuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authService = inject(AdminAuthService);
    const router = inject(Router);
    return authService.checkLogin().pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          return true;
        } else {
          router.navigate(['/admin/home']);
          return false;
        }
      })
    );
  };