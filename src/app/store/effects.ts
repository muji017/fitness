import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { Injectable } from "@angular/core";
import {
  changePlanStatusApi,
  changeTrainerStatusApi, changeUserStatusApi, deleteDietPlanApi, getDietPlansListApi, getDietPlansListApiSuccess, getPlansListApi, getPlansListApiSuccess, getTrainersListApi,
  getTrainersListApiSuccess, getUsersListApi, getUsersListApiSuccess,
  loginFail, loginStart, loginSuccess
} from "./action";
import { UserService } from "../services/userServices/user.service";
import { Router } from "@angular/router";
import { AdminService } from "../services/adminServices/admin.service";
import { TrainerService } from "../services/trainerServices/trainer.service";

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private service: UserService,
    private router: Router,
    private adminService: AdminService,
    private trainerService:TrainerService
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


  // plans part effects

  // plans list

  getPlansList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getPlansListApi),
      mergeMap(() => {
        return this.adminService.getPlans().pipe(
          map((res) => {
            return getPlansListApiSuccess({ plans: Object.values(res.plans) })
          })
        )
      })
    )
  })


  changePlanStaus$=createEffect(()=>{
    return this.actions$.pipe(
    ofType(changePlanStatusApi),
    mergeMap((action)=>{
      return this.adminService.changePlanStatus(action.planId).pipe(
        map((data)=>{
          return getPlansListApiSuccess({plans:Object.values(data.plans)})
        })
      )
    })
    )
  })


  // diet plans

  
  getDietPlansList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getDietPlansListApi),
      mergeMap(() => {
        return this.trainerService.getDietPlans().pipe(
          map((res) => {
            return getDietPlansListApiSuccess({ Dietplans: Object.values(res.DietPlans) })
          })
        )
      })
    )
  })

  // delete dietplan

  deleteDietPlan$= createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteDietPlanApi),
      mergeMap((action) => {
        return this.trainerService.deleteDietPlan(action.planId).pipe(
          map((res) => {
            return getDietPlansListApi()
          })
        )
      })
    )
  })

}

