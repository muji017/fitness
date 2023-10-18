import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { getTrainersListApi, getTrainersListApiSuccess, loginFail, loginStart, loginSuccess } from "./action";
import { UserService } from "../services/userServices/user.service";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private service: UserService,
        private router:Router
    ) { }


    getTrainersList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getTrainersListApi),
        mergeMap(() => {
                return this.service.getTrainersList().pipe(
                    map((res) => {

                        console.log("effect", Object.values(res))
                        return getTrainersListApiSuccess({ trainers: Object.values(res.trainers) })
                    })
                )
            })
        )
    })
    login$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(loginStart),
          switchMap((action) => {
            return this.service.login(action.email, action.password).pipe(
              map((data) => {
                console.log("here",data);
                return loginSuccess({userToken:data});
              }),
              catchError((error) => {
                console.log("error in loginstart");
                
                return of(loginFail({ error }));
              })
            );
          })
        );
      });
    
    
      // loginredirect$ = createEffect(() => {
      //   return this.actions$.pipe(
      //     ofType(loginSuccess),
      //     tap((action) => {
      //       this.router.navigate(['/home'])
      //     })
      //   )
      // },
      //   { dispatch: false }
      // )
    
    
}