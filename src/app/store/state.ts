import { UserModel, trainer, userToken } from "../model/userModel"

export const userState: UserModel = {
    name: '',
    email: '',
    password: "",
    userToken: "",
    image:"",
    _id:""
}

export const alltrainersState: trainer[] = []

export const authState: userToken = {

    userToken: "",
    userId:"",
    error:"",
}
