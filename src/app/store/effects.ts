import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { Injectable } from "@angular/core";
import {
  changeTrainerStatusApi, changeUserStatusApi, getTrainersListApi,
  getTrainersListApiSuccess, getUsersListApi, getUsersListApiSuccess,
  loginFail, loginStart, loginSuccess
} from "./action";
import { UserService } from "../services/userServices/user.service";
import { Router } from "@angular/router";
import { AdminService } from "../services/adminServices/admin.service";

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private service: UserService,
    private router: Router,
    private adminService: AdminService
  ) { }


  getTrainersList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTrainersListApi),
      mergeMap(() => {
        return this.service.getTrainersList().pipe(
          map((res) => {
            return getTrainersListApiSuccess({ trainers: Object.values(res.trainers) })
          })
        )
      })
    )
  })


  getUsersList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUsersListApi),
      mergeMap(() => {
        return this.adminService.getUsersList().pipe(
          map((res) => {
            return getUsersListApiSuccess({ users: Object.values(res.users) })
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
            return loginSuccess({ userToken: data });
          }),
          catchError((error) => {

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

  changeTrainerStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changeTrainerStatusApi),
      mergeMap((action) => {
        return this.adminService.changeTrainerStatus(action.trainerId).pipe(
          map((data) => {
            // The status change is completed, so reload the page
            return getTrainersListApiSuccess({ trainers: Object.values(data.trainers) })
          })
        );
      })
    );
  });

  changeUserStaus$=createEffect(()=>{
    return this.actions$.pipe(
    ofType(changeUserStatusApi),
    mergeMap((action)=>{
      return this.adminService.changeUserStatus(action.userId).pipe(
        map((data)=>{
          return getUsersListApiSuccess({users:Object.values(data.users)})
        })
      )
    })
    )
  })

}

