import cart from "../models/cartsModel.js";
import { profiles } from "../models/profileModels.js";


export const addItem = async(req,res)=>{

    const profileId =req.profile;
    const userId =req.user;

    console.log("this is profile id",profileId);
    console.log("this is user id",userId);

    const foundProfile = await profiles.findById(profileId);

    console.log("found profile details:",foundProfile);

    if(foundProfile.userId != req.user){
        res.status(200).json({message:"User not logged IN"});
    }
    
    const {productId}= req.body;

    const foundCart = await cart.findOne({profileId});

    const itemIndex = foundCart.items.findIndex(item=>{
        if(item.productId === productId){
            return item;
        }
        else{
            return -1;
        }
    });

    if (itemIndex > -1) {
      foundCart.items[itemIndex].quantity += 1;
    } else {
      foundCart.items.push({ productId, quantity: 1 });
    }

    await foundCart.save();

    console.log("foundcart:",foundCart);

    res.status(200).json({message:"item added"})

}