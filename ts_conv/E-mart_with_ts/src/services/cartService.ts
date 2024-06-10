import { ObjectId } from "mongoose";
import { Response } from "express";
import cartModel from "../models/cartModel";
import { IItems } from "../interfaces/cartModelInteface";


export const addItemService =async(profileId:ObjectId,email:String,productId:any,productName:String,userEmail:String,res:Response):Promise<void>=>{

    if(userEmail!=email){
        res.status(401).json({message:"Unauthorized access"});
        console.log("Unauthorized access to add item in cart");
        throw new Error;
    }

    const foundCart : any= await cartModel.findOne({profileId});

    console.log("Found cart ",foundCart);
    //now adding items to cart
    const itemIndex :number = foundCart.items.findIndex((item : IItems) => item.productId === productId);

    if (itemIndex > -1) { 

      foundCart.items[itemIndex].quantity += 1;

    } else {

      foundCart.items.push({ productId,productName, quantity: 1 });

    }

    await foundCart.save();

}