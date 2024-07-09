import { ObjectId } from "mongoose"

export interface IBookModel{
    title:string,

    author:ObjectId,
    category:string,
    ISBN:string,
    description:string,
    price:number
}