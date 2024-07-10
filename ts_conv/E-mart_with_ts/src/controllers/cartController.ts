import { Response } from "express";
import { cartServiceClass } from "../services/cartService";
import cartModel from "../models/cartModel";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const cartServiceObj = new cartServiceClass();

export class cartControllerClass {

  addItem = async (req: any, res: Response): Promise<void> => {
    try {
      const profileId = req.profileId;
      const email = req.email;

      const { productId, productName, userEmail } = req.body;

      await cartServiceObj.addItemService(
        profileId,
        email,
        productId,
        productName,
        userEmail,
        res
      );
      res.status(200).json({ message: "Item added to cart" });
      console.log("Item Added");
    } catch (error) {
      console.log(error);
    }
  };

  removeItem =async (req:any,res:Response):Promise<void>=>{

    try {
      const profileId =req.profileId;
      
      const email = req.email;

      const {productId,userEmail} = req.body;

      await cartServiceObj.removeItemService(profileId,email,productId,userEmail,res);

      req.status(200).json({message:"Item Removed from cart"});

    } catch (error) {
      console.log(error);
      
    }

  }

  viewCart = async (req: any, res: Response): Promise<void> => { 
    
    try {

      const cartDetails = await cartModel.aggregate([
        { $match: { profileId: new ObjectId(req.profileId) } },
        { $unwind: "$items" },
        {
          $lookup: {
            from: "products",
            localField: "items.productId",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        { $unwind: "$productDetails"},
        {
          $project: {
            _id: 0,
            productName: "$productDetails.productName",
            productCategory: "$productDetails.productCategory",
            quantity: "$items.quantity",
            price: "$productDetails.price", 
            totalItemCost: { $multiply: ["$items.quantity", "$productDetails.price"] }
          }
        },
        {
          $group: {
            _id: null,
            cartItems: { $push: "$$ROOT" },
            totalCost: { $sum: "$totalItemCost" }
          }
        },
        {
          $project: {
            _id: 0,
            cartItems: 1,
            totalCost: 1
          }
        }
      ]);

      if (cartDetails.length > 0) {
        res.status(200).json(cartDetails[0]);
      } else {
        res.status(404).json({ message: "Cart not found" });
      }
      
    } catch (error) {
      console.error("Error viewing cart details:", error);
      res.status(500).json({ message: "An error occurred while fetching cart details" });
    }
  }

}

