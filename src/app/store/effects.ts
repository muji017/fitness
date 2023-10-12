import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { getTrainersListApi, getTrainersListApiSuccess } from "./action";
import { UserService } from "../services/userServices/user.service";

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private service: UserService
    ) { }


    getTrainersList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getTrainersListApi),
            exhaustMap(() => {
                return this.service.getTrainersList().pipe(
                    map((res) => {

                        console.log("effect", Object.values(res))
                        return getTrainersListApiSuccess({ trainers: Object.values(res.trainers) })
                    })
                )
            })
        )
    })
}