import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import {Observable, map} from "rxjs"
import { TrainerAuthService } from "./trainerAuth.service";

export const TrainerhomeAuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authService = inject(TrainerAuthService);
    const router = inject(Router);
    return authService.checkLogin().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true;
        } else {
          router.navigate(['/trainer/login']);
          return false;
        }
      })
    );
  };

  export const TrainerLoginAuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authService = inject(TrainerAuthService);
    const router = inject(Router);
    return authService.checkLogin().pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          return true;
        } else {
          router.navigate(['/trainer/home']);
          return false;
        }
      })
    );
  };