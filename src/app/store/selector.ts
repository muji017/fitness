import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AuthModel, PlansModel, UserModel, trainer, userToken } from "../model/userModel"

export const alltrainersStateName = "alltrainersStateName"
export const authStateName = "authStateName"
export const allUsersStateName ="allUsersStateName"
export const allPlansStateName="allPlanStateName"

export const alltrainersState = createFeatureSelector<trainer[]>(alltrainersStateName)
export const getAllTrainers = createSelector(alltrainersState,
    (state: trainer[]) => {
        return state
    }
)

export const allUsersState = createFeatureSelector<UserModel[]>(allUsersStateName)
export const getAllUsers = createSelector(allUsersState,
    (state: UserModel[]) => {
        return state
    }
)

export const allPlansState = createFeatureSelector<PlansModel[]>(allPlansStateName)
export const getAllPlans = createSelector(allPlansState,
    (state: PlansModel[]) => {
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