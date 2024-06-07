import { Response } from "express"
import userModel from "../models/userModel";
import cartModel from "../models/cartModel";
import { IItems } from "../interfaces/cartModelInteface";

export const addItem =async (req:any,res:Response) : Promise<void>=>{

    try {
        const profileId = req.profileId;
        const email = req.email;
    
        const {productId,productName,userEmail} = req.body;
    
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

        res.status(200).json({message:"Item added to cart"});
        console.log("Item Added")
        
    } catch (error) {
        console.log(error);
    }
}