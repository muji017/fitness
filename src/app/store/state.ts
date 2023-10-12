import { UserModel, trainer } from "../model/userModel"

export const initialState: UserModel = {
    name: '',
    email: '',
    password: "",
    userToken: "",
    image:"",
    _id:""
}

export const alltrainersState: trainer[] = []
 