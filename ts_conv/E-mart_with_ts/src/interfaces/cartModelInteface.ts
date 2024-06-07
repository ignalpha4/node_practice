import { Types } from "mongoose"

export interface ICartModel{
    profileId:Types.ObjectId,
    items:IItems[]
}


export interface IItems{
    productId:string,
    quantity:number,
    productName:string
}