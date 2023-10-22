export interface UserModel{
    userToken?: string,
    userId?:any,
    name:string,
    email:string,
    subscriptionDate?:Date,
    expiryDate?:Date,
    paymentMethod?:string,
    amount?:number
    password?:string,
    image?:string
}

export interface userToken{
    userToken:string,
    userId:any,
    error:any
}

export interface trainer{
    id:any,
    name:string,
    email:string,
    image:string,
    qualification:string,
    specification:string,
    location:String,
    jobPosition:String,
    description:string,
    isVerified:string
}

export interface userlist extends UserModel{
    users:UserModel[]
}


export interface trainerlist extends trainer{
    trainers:trainer[]
}

export interface AuthModel {
    error:string
}

export interface PlansModel{
_id:any,
title:String,
duration:Number,
amount:Number,
description:String,
}