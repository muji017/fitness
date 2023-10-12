import { createFeatureSelector, createSelector } from "@ngrx/store"
import { trainer } from "../model/userModel"

export const alltrainersStateName ="alltrainersStateName" 

export const alltrainersState=createFeatureSelector<trainer[]>(alltrainersStateName)

export const getAllTrainers=createSelector(alltrainersState,
    (state: trainer[]) => {
        return state
    }
)