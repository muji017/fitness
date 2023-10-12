import { createReducer, on } from "@ngrx/store"
import { alltrainersState } from "./state"
import { getTrainersListApi, getTrainersListApiSuccess } from "./action"



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