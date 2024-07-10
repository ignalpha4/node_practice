import { ObjectId } from "mongoose";
import { Response } from "express";
import cartModel from "../models/cartModel";
import { IItems } from "../interfaces/cartModelInteface";


export class cartServiceClass{

  addItemService =async(profileId:ObjectId,email:String,productId:any,productName:String,userEmail:String,res:Response):Promise<void>=>{

    if(userEmail!=email){
        res.status(401).json({message:"Unauthorized access"});
        console.log("Unauthorized access to add item in cart");
        throw new Error;
    }

    const foundCart : any= await cartModel.findOne({profileId});

    console.log("Found cart ",foundCart);

    console.log(productId)
    //now adding items to cart
    const itemIndex :number = foundCart.items.findIndex((item : IItems) => item.productId == productId);

    console.log(itemIndex);
    
    if (itemIndex > -1) { 

      foundCart.items[itemIndex].quantity += 1;

    } else {

      foundCart.items.push({ productId,productName, quantity: 1 });

    }

    await foundCart.save();

  }


  removeItemService = async(profileId: ObjectId, email: String, productId: any, userEmail: String, res: Response): Promise<void> => {

    if (userEmail != email) {
      res.status(401).json({ message: "Unauthorized access" });
      console.log("Unauthorized access to remove item from cart");
      throw new Error("Unauthorized access");
    }

    const foundCart: any = await cartModel.findOne({ profileId });

    if (!foundCart) {
      res.status(404).json({ message: "Cart not found" });
      console.log("Cart not found");
      throw new Error("Cart not found");
    }

    const itemIndex: number = foundCart.items.findIndex((item: IItems) => item.productId == productId);

    if (itemIndex > -1) {

      foundCart.items[itemIndex].quantity -= 1;  //decreasing the quantity

      if (foundCart.items[itemIndex].quantity === 0) {
        foundCart.items.splice(itemIndex, 1);
      }
      await foundCart.save();
      res.status(200).json({ message: "Item removed" });
      console.log("Item removed from cart");
      
    } else {
      res.status(404).json({ message: "Item not found in cart" });
      console.log("Item not found in cart");
      throw new Error("Item not found in cart");
    }
  }

}


