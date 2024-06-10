import { ObjectId } from "mongoose";
import profileModel from "../models/profileModel";
import { IProfileModel } from "../interfaces/profileModelInterface";
import { Request,Response } from "express"
import cartModel from "../models/cartModel";
import { IUserModel } from "../interfaces/userModelInterface";
import userModel from "../models/userModel";
import { createProfileToken } from "../utils/profileToken";


export const addProfileService = async(userId:ObjectId,profileName:String,res:Response) : Promise<IProfileModel > =>{

    const createdProfile :IProfileModel | null  = await profileModel.create({userId,profileName});
    if(createdProfile==null){
        res.status(400).json({message:"Provide valid body to create profile"});
        console.log("error creating profile");
    }

    //creating cart as well for the profile
    await cartModel.create({profileId:createdProfile._id})

    return createdProfile;
}

export const  listProfilesService =async(userId:ObjectId) : Promise<any> =>{

    console.log("Findind Users for Id: ",userId);

    const foundProfiles  = await profileModel.find({userId});

    return foundProfiles;

}

export const deleteProfileService =async(profileId:ObjectId,userId:ObjectId,res:Response):Promise<any>=>{

    const foundProfile  = await profileModel.findById(profileId);
    
    if(!foundProfile){
        res.status(400).json({message:"Cannot find profile with provided ID"});
        console.log("Profile Id not found for deletion");
        throw new Error;
    }

    if(foundProfile?.userId == userId){
        await profileModel.findByIdAndDelete(profileId);
    }else{
        res.status(400).json({message:"Not authorized to delete this profile"});
        console.log("Unauthorized access");
        throw new Error;
    }

    return foundProfile;
}

export const selectProfileService = async(profileId:ObjectId,userId:ObjectId,res:Response):Promise<String>=>{

    const foundProfile = await profileModel.findById(profileId);
    
    if(!foundProfile){
        res.status(404).json({message:"Cannot find profile with this id "});
        console.log("Cannot find the profile to select");
        throw new Error;
    }

                
    if(foundProfile.userId != userId){
        res.status(401).json({message:"You are not authorized to access this profile"});
        res.send("Unauthorized user accessing the profile");
        throw new Error;
    }

    //token creation for the selected profile

    const foundUser : IUserModel | null = await userModel.findById(userId);

    if(!foundUser){
        res.status(404).json({message:"Cannot find user authorized "});
        console.log("Cannot find the user");
        throw new Error;
    }

    console.log("this is the found user during profile token gen",foundUser);

    const token = createProfileToken(foundProfile._id,foundUser.email);

    return token;
}