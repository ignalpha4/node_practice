import { Types } from "mongoose";


export interface IProfileModel {
    userId:Types.ObjectId,
    profileName:string,
}