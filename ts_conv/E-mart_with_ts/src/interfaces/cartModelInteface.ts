import { ObjectId, Types } from "mongoose"

export interface ICartModel{
    profileId:ObjectId,
    items:IItems[]
}


export interface IItems{
    productId:string,
    quantity:number,
    productName:string
}