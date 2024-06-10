import { Response } from "express"
import { cartServiceClass } from "../services/cartService";


export const cartServiceObj = new cartServiceClass();

export class cartControllerClass{

  addItem =async (req:any,res:Response) : Promise<void>=>{

    try {
        const profileId = req.profileId;
        const email = req.email;
    
        const {productId,productName,userEmail} = req.body;
    
        await cartServiceObj.addItemService(profileId,email,productId,productName,userEmail,res);
        res.status(200).json({message:"Item added to cart"});
        console.log("Item Added")
        
    } catch (error) {
        console.log(error);
    }
}

}
