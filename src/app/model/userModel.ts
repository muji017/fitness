export interface UserModel{
    userToken: string,
    _id:any,
    userId?:any,
    name:string,
    email:string,
    password:string,
    image:string
}

export interface userToken{
    userToken:string,
    userId:any
}