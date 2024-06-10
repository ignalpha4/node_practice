import {ObjectId, Types } from "mongoose";


export interface IProfileModel {
    userId:ObjectId,
    profileName:string,
    _id?:ObjectId
}