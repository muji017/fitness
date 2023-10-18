import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AuthModel, trainer, userToken } from "../model/userModel"

export const alltrainersStateName = "alltrainersStateName"
export const authStateName = "authStateName"

export const alltrainersState = createFeatureSelector<trainer[]>(alltrainersStateName)

export const getAllTrainers = createSelector(alltrainersState,
    (state: trainer[]) => {
        return state
    }
)

export const loginSuccessState = createFeatureSelector<userToken>(authStateName)

export const getLoginSuccess = createSelector(loginSuccessState, (state: userToken) => {


    return state
})

export const getLoginFail = createSelector(loginSuccessState, (state: userToken) => {

    return state
})