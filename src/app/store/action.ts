import { createAction, props } from "@ngrx/store";
import { trainer } from "../model/userModel";

export const getTrainersListApi=createAction("getTrainersListApi")

export const getTrainersListApiSuccess=createAction("getTrainersListApiSuccess",props<{ trainers:trainer[] }>())