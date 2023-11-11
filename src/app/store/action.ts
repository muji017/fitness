import { createAction, props } from "@ngrx/store";
import { DietPlansModel, PlansModel, UserModel, VideoModel, trainer, userToken } from "../model/userModel";


// Users side 
export const getUserDetailsApi=createAction("getUserDetailsApi")

export const loginStart=createAction("loginStart",props<{ email:string,password:string }>())

export const loginSuccess=createAction("loginSuccess",props<{userToken:userToken}>())
// traines list
export const getTrainersListAdminApi=createAction("getTrainersListAdminApi")

export const getTrainersListApi=createAction("getTrainersListApi")

export const getTrainersListApiSuccess=createAction("getTrainersListApiSuccess",props<{ trainers:trainer[] }>())

export const loginFail =createAction("loginFail",props<{error:Error}>());

export const changeTrainerStatusApi=createAction("changeTrainerStatusApi",props<{trainerId:any}>())

// trainer profile

export const getTrainerProfileApi=createAction("getTrainerProfileApi")


export const getTrainerProfileApiSuccess=createAction("getTrainerProfileApiSuccess",props<{ trainer:any}>())

// get users list and operations
export const getSubscriberListApi=createAction("getSubscriberListApi")

export const getUsersListApi=createAction("getUsersListApi")

export const getUsersListApiSuccess=createAction("getUsersListApiSuccess",props<{ users:UserModel[]}>())

export const changeSubscribersStatusApi=createAction("changeSubscribersStatusApi",props<{userId:any}>())

export const changeUserStatusApi=createAction("changeUserStatusApi",props<{userId:any}>())

// get plans list and operations


export const getPlansListApi=createAction("getPlansListApi")

export const getPlansListApiSuccess=createAction("getPlansListApiSuccess",props<{ plans:PlansModel[]}>())

export const changePlanStatusApi=createAction("changePlanStatusApi",props<{planId:any}>())

// diet Plans

export const getDietPlansListApi=createAction("getDietPlansListApi")

export const getAllDietPlansListApi=createAction("getAllDietPlansListApi")

export const getAllAdminDietPlansListApi=createAction("getAllAdminDietPlansListApi")

export const getDietPlansListApiSuccess=createAction("getDietPlansListApiSuccess",props<{ Dietplans:DietPlansModel[]}>())

export const deleteDietPlanApi=createAction("deleteDietPlanApi",props<{planId:any}>())

export const changeDietPlanStatusApi=createAction("changeDietPlanStatusApi",props<{planId:any}>())

export const changeDietPremiumApi=createAction("changeDietPremiumApi",props<{planId:any}>())

// videos
export const getAllVideoListApi=createAction("getAllVideoListApi")

export const getAllVideosTrainerApi=createAction("getAllVideosApi")

export const getAllVideosApiSuccess=createAction("getAllVideosApiSuccess",props<{videos:VideoModel[]}>())

export const deleteVideoApi=createAction("deleteVideoApi",props<{videoId:any}>())