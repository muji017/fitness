export interface chatRoom{
    _id:string
    userId:any
    trainerId:any
}

export interface chatRooms extends chatRoom{
    chatRooms:chatRoom[]
}

export interface watchhistoryData{
    _id:any
    userId: string
    videoId:string[]
}

export interface watchList extends watchhistoryData{
    watchhistory:watchhistoryData[]
}