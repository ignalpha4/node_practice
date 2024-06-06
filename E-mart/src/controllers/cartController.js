import cart from "../models/cartsModel.js";
import { profiles } from "../models/profileModels.js";


export const addItem = async(req,res)=>{

    try {
        const profileId =req.profile;
        // const userId =req.userId;
        const email = req.email;
        //using mail to verify user further
        const {useremail} = req.body;
    
        const foundProfile = await profiles.findById(profileId);
    
        if(useremail != email){
            res.status(200).json({message:"Unauthorized access"});
            throw new Error;
        }
    
        console.log("found profile details:\n",foundProfile);
    
        
        const {productId}= req.body;
    
        const foundCart = await cart.findOne({profileId});
    
        const itemIndex = foundCart.items.findIndex(item=>item.productId === productId)
    
        if (itemIndex > -1) {
          foundCart.items[itemIndex].quantity += 1;
        } else {
          foundCart.items.push({ productId, quantity: 1 });
        }
    
        await foundCart.save();
    
        res.status(200).json({message:"item added"})
        console.log("item added")

        
    } catch (error) {
        console.log(error);
    }


}