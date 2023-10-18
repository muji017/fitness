import { createAction, props } from "@ngrx/store";
import { UserModel, trainer, userToken } from "../model/userModel";

export const loginStart=createAction("loginStart",props<{ email:string,password:string }>())

export const loginSuccess=createAction("loginSuccess",props<{userToken:userToken}>())

export const getTrainersListApi=createAction("getTrainersListApi")

export const getTrainersListApiSuccess=createAction("getTrainersListApiSuccess",props<{ trainers:trainer[] }>())

export const loginFail =createAction("loginFail",props<{error:Error}>());
