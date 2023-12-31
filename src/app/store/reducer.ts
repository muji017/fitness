import { createReducer, on } from "@ngrx/store"
import { allDietPlansState, allPlansState, alltrainersState, allUserState, allVideosState, authState, trainerState } from "./state"
import {  getAllVideosApiSuccess, getDietPlansListApiSuccess, getPlansListApiSuccess, getTrainerProfileApiSuccess, getTrainersListApiSuccess, getUsersListApiSuccess, loginFail, loginSuccess } from "./action"
import { UserModel, userToken } from "../model/userModel"


// trainer
const _allTrainersReducer= createReducer(
    alltrainersState,
    on(getTrainersListApiSuccess, (_state, { trainers}) => {
      return  Object.values(trainers)
      
    }),
  )

  export function allTrainersReducer(state:any, action:any){
    return _allTrainersReducer(state,action)
  }

  // single trainer

  const _trainerReducer = createReducer(
    trainerState,
    on(getTrainerProfileApiSuccess, (_state, { trainer }) => {
      // Update the trainer state with the data from the action
      return {
        ..._state,
        ...trainer,
      };
    })
  );
  
  export function trainerReducer(state:any | undefined, action: any) {
    return _trainerReducer(state, action);
  }
// user
  const _allUsersReducer= createReducer(
    allUserState,
    on(getUsersListApiSuccess, (_state, { users}) => {
      return  Object.values(users)
      
    }),
  )
  export function allUsersReducer(state:any, action:any){
    return _allUsersReducer(state,action)
  }

  // plans
  
  const _allPlansReducer= createReducer(
    allPlansState,
    on(getPlansListApiSuccess, (_state, { plans}) => {
      return  Object.values(plans)
      
    }),
  )
  export function allPlansReducer(state:any, action:any){
    return _allPlansReducer(state,action)
  }


    // Diet plans
  
    const _allDietPlansReducer= createReducer(
      allDietPlansState,
      on(getDietPlansListApiSuccess, (_state, { Dietplans}) => {
      return  Object.values(Dietplans)
        
      }),
    )
    export function allDietPlansReducer(state:any, action:any){
      return _allDietPlansReducer(state,action)
    }

// videos 
    
const _allVideosReducer= createReducer(
  allVideosState,
  on(getAllVideosApiSuccess, (_state, { videos}) => {
  return  Object.values(videos)
    
  }),
)
export function allVideosReducer(state:any, action:any){
  return _allVideosReducer(state,action)
}

  const _authReducer = createReducer(
    authState,
    on(loginSuccess, (state:any, action:any) => {
        
      return {
        ...state,
        userToken: action.userToken.userToken,
        userId:action.userToken.userId,
        error: ""
        
      };
    }),
    on(loginFail, (state:any, action:any) => {
        
      return {
        ...state,
        error: action.error
      };
    }
    ),
    
)

export function AuthReducer(state:any, action:any){
    return _authReducer(state,action)
}