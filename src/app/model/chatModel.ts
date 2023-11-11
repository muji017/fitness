export interface chatRoom{
    _id:string
    userId:any
    trainerId:any
}

export interface chatRooms extends chatRoom{
    chatRooms:chatRoom[]
}