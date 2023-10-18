export interface UserModel{
    userToken?: string,
    _id:any,
    userId?:any,
    name:string,
    email:string,
    subscriptionDate?:Date,
    expiryDate?:Date,
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
    qualification:string,
    level:string,
    image:string,
    location:String,
    jobPosition:String,
    description:string
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