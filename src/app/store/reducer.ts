import { createReducer, on } from "@ngrx/store"
import { alltrainersState, userState, authState } from "./state"
import { getTrainersListApi, getTrainersListApiSuccess, loginFail, loginSuccess } from "./action"
import { UserModel, userToken } from "../model/userModel"



const _allTrainersReducer= createReducer(
    alltrainersState,
    on(getTrainersListApiSuccess, (_state, { trainers}) => {
      console.log("inside reducer", Object.values(trainers))
      return  Object.values(trainers)
      
    })
  )

  export function allTrainersReducer(state:any, action:any){
    return _allTrainersReducer(state,action)
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
        console.log(" reducer loginfail ");
        
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