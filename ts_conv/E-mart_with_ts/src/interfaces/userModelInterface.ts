import { Types } from "mongoose";


export interface IUserModel {
    name:string,
    email:string,
    password:string,
    _id?:Types.ObjectId,
}


