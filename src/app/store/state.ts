import { PlansModel, UserModel, trainer, userToken } from "../model/userModel"

export const allUserState: UserModel[] = []

export const alltrainersState: trainer[] = []

export const allPlansState:PlansModel[]=[]

export const authState: userToken = {

    userToken: "",
    userId:"",
    error:"",
}
