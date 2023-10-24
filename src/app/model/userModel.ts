export interface UserModel {
    userToken?: string,
    userId?: any,
    name: string,
    email: string,
    subscriptionDate?: string,
    expiryDate?: string,
    paymentMethod?: string,
    amount?: number
    password?: string,
    image?: string,
    isBlocked?: boolean
}

export interface userToken {
    userToken: string,
    userId: any,
    error: any
}

export interface trainer {
    _id?:any
    id?: any,
    name: string,
    email: string,
    image: string,
    qualification: string,
    specification: string,
    location: String,
    jobPosition: String,
    description: string,
    isVerified: boolean
}

export interface userlist extends UserModel {
    users: UserModel[]
}


export interface trainerlist extends trainer {
    trainers: trainer[]
}

export interface AuthModel {
    error: string
}

export interface PlansModel {
    _id: any,
    title: String,
    duration: Number,
    amount: Number,
    description: String,
    isVerified: boolean,
}

export interface PlanList extends PlansModel {
    plans: PlansModel[]
}


export interface DietPlansModel {
    _id: any,
    trainerId:any,
    title: String,
    uploadDate:string,
    foodType: string,
    description: String,
    isAprooved: boolean,
    isPremium:boolean
    image:string
}

export interface DietPlanList extends DietPlansModel {
    DietPlans: DietPlansModel[]
}
