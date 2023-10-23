import { DietPlansModel, PlansModel, UserModel, trainer, userToken } from "../model/userModel"

export const allUserState: UserModel[] = []

export const alltrainersState: trainer[] = []

export const allPlansState:PlansModel[]=[]

export const allDietPlansState:DietPlansModel[]=[]

export const authState: userToken = {

    userToken: "",
    userId:"",
    error:"",
}
