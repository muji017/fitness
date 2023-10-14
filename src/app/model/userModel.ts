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

export interface trainer{
    id:any,
    name:string,
    qualification:string,
    level:string,
    image:string,
    location:String,
    jobPosition:String
}

export interface trainerlist extends trainer{
    trainers:trainer[]
}