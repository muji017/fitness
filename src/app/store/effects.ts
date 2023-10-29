import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { Injectable } from "@angular/core";
import {
  changeDietPremiumApi,
  changePlanStatusApi,
  changeTrainerStatusApi, changeUserStatusApi, deleteDietPlanApi, deleteVideoApi, getAllAdminDietPlansListApi, getAllDietPlansListApi, getAllVideosApiSuccess, getAllVideosTrainerApi, getDietPlansListApi, getDietPlansListApiSuccess, getPlansListApi, getPlansListApiSuccess, getTrainerProfileApi, getTrainerProfileApiSuccess, getTrainersListAdminApi, getTrainersListApi,
  getTrainersListApiSuccess, getUsersListApi, getUsersListApiSuccess,
  loginFail, loginStart, loginSuccess
} from "./action";

import { Router } from "@angular/router";
import { AdminService } from "../services/adminServices/admin.service";
import { TrainerService } from "../services/trainerServices/trainer.service";
import { UserService } from "../services/userServices/user.service";

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private service: UserService,
    private router: Router,
    private adminService: AdminService,
    private trainerService:TrainerService
  ) { }

// trainer part
getTrainersListAdmin$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(getTrainersListAdminApi),
    mergeMap(() => {
      return this.adminService.getTrainersList().pipe(
        map((res) => {
          return getTrainersListApiSuccess({ trainers: Object.values(res.trainers) })
        })
      )
    })
  )
})


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

  getTrainerProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTrainerProfileApi),
      mergeMap(() => {
        return this.trainerService.getTrainerProfile().pipe(
          map((res) => {
            console.log(res)
            return getTrainerProfileApiSuccess({trainer: Object.values(res) })
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


  changeDietPremium$=createEffect(()=>{
    return this.actions$.pipe(
    ofType(changeDietPremiumApi),
    mergeMap((action)=>{
      console.log("effect",action.planId)
      return this.adminService.changeDietPremium(action.planId).pipe(
        map((data)=>{
          return getAllDietPlansListApi()
        })
      )
    })
    )
  })

  getAllDietPlansList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllDietPlansListApi),
      mergeMap(() => {
        return this.service.getDietPlans().pipe(
          map((res) => {
            return getDietPlansListApiSuccess({ Dietplans: Object.values(res.DietPlans) })
          })
        )
      })
    )
  })

  // admin

  getAllAdminDietPlansList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllAdminDietPlansListApi),
      mergeMap(() => {
        return this.adminService.getDietPlans().pipe(
          map((res) => {
            return getDietPlansListApiSuccess({ Dietplans: Object.values(res.DietPlans) })
          })
        )
      })
    )
  })

  // videos trainer

  getAllVideos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllVideosTrainerApi),
      mergeMap(() => {
        return this.trainerService.getAllVideos().pipe(
          map((res) => {
            return getAllVideosApiSuccess({ videos: Object.values(res.VideoModel) })
          })
        )
      })
    )
  })

// delete video trainer

  deleteVideo$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(deleteVideoApi),
      mergeMap((action)=>{
        return this.trainerService.deleteVideo(action.videoId).pipe(
          map((res)=>{
            return getAllVideosApiSuccess({ videos: Object.values(res.VideoModel) })
          })
        )
      })
    )
  })

}

