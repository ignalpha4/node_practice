import cart from "../models/cartsModel.js";
import { profiles } from "../models/profileModels.js";
import { user } from "../models/userModels.js";
import { generateTokenProfile } from "../utils/jwt_profile.js";


export const addProfile=async(req,res)=>{

    try {
        
        const {profileName} = req.body;
        const userId = req.user;
    
        const profile ={userId,profileName};
    
        const addedProfile = await profiles.create(profile);


        //passing userid as well as profile id to gen tokens
        const token_obj = {
            profileId:addedProfile._id,
            userId:userId
        }

        const token = generateTokenProfile(token_obj);

        const createCart = await cart.create({profileId:addedProfile._id});

        console.log(`profile added for user ${userId}`);

        res.status(200).json({message:"profile added",token:token});

    } catch (error) {
        console.log(error);
    }
}


export const editProfile=async(req,res)=>{

    try {
        
        const {profileName} = req.body;
        const userId = req.user;

        console.log("profileName",profileName);
        
        console.log("userId",userId);


        const foundProfile = await profiles.findOne({userId});

        if(foundProfile){
            foundProfile.profileName = profileName;
            await foundProfile.save();
        }

        console.log(`profile updated of user ${userId}`);

        res.status(200).json({message:`profile updated of user ${userId}`});

    } catch (error) {
        console.log(error);
    }

}



export const deleteProfile=async(req,res)=>{

    try {
        
        const userId = req.user;

        const {profileName} = req.body;

        await profiles.findOneAndDelete({profileName});

        console.log(`profile deleted`);

        res.status(200).json({message:`profile deleted`});

    } catch (error) {
        console.log(error);
    }

}