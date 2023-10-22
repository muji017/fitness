import { createAction, props } from "@ngrx/store";
import { UserModel, trainer, userToken } from "../model/userModel";

export const loginStart=createAction("loginStart",props<{ email:string,password:string }>())

export const loginSuccess=createAction("loginSuccess",props<{userToken:userToken}>())

export const getTrainersListApi=createAction("getTrainersListApi")

export const getTrainersListApiSuccess=createAction("getTrainersListApiSuccess",props<{ trainers:trainer[] }>())

export const loginFail =createAction("loginFail",props<{error:Error}>());

export const changeTrainerStatusApi=createAction("changeTrainerStatusApi",props<{trainerId:any}>())

export const getUsersListApi=createAction("getUsersListApi")

export const getUsersListApiSuccess=createAction("getUsersListApiSuccess",props<{ users:UserModel[]}>())

export const changeUserStatusApi=createAction("changeUserStatusApi",props<{userId:any}>())