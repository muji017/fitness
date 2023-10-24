import { DietPlansModel, PlansModel, UserModel, trainer, userToken } from "../model/userModel"

export const allUserState: UserModel[] = []

export const alltrainersState: trainer[] = []

export const allPlansState:PlansModel[]=[]

export const allDietPlansState:DietPlansModel[]=[]

export const trainerState:trainer={
    _id:"",
    id: "",
    name:"" ,
    email:"",
    image:"",
    qualification:"",
    specification:"",
    location:"",
    jobPosition:"",
    description:"",
    isVerified:true
}

export const authState: userToken = {

    userToken: "",
    userId:"",
    error:"",
}
