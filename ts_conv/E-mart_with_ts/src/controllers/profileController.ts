import { Request,Response } from "express"
import profileModel from "../models/profileModel";
import cartModel from "../models/cartModel";
import { createProfileToken } from "../utils/profileToken";
import userModel from "../models/userModel";
import { IUserModel } from "../interfaces/userModelInterface";


//adding profile
export const addProfile = async(req:any,res:Response) :Promise<void> =>{

    const userId = req.userId;
    const {profileName} = req.body;

    const createdProfile = await profileModel.create({userId,profileName});

    if(!createdProfile){
        res.status(400).json({message:"Provide valid body to create profile"});
        console.log("error creating profile");
    }

    
    //creating cart as well for the profile
    await cartModel.create({profileId:createdProfile._id})

    res.status(400).json({message:"Profile Created: ",createdProfile});
    console.log("Profile Created");
    
}

//list profiles

export const listProfiles = async(req:any,res:Response): Promise<void> =>{

    const userId = req.userId;

    console.log("Finding users for this Id",userId);

    const foundProfiles = await profileModel.find({userId});

    res.status(200).json({message:"List of profiles for this user : ",foundProfiles});
    console.log("Profiles listed");
}




//delete profile

export const deleteProfile = async(req:any,res:Response) :Promise<void>=>{

    try {
        
        const {profileId} = req.body;
        const userId = req.userId;
    
    
        const foundProfile = await profileModel.findById(profileId);
    
        if(!foundProfile){
            res.status(400).json({message:"Cannot find profile with provided ID"});
            console.log("Profile Id not found for deletion");
            throw new Error;
        }
    
        if(foundProfile?.userId == userId){
            await profileModel.findByIdAndDelete(profileId);
        }else{
            res.status(400).json({message:"Not authorized to delte this profile"});
            console.log("Unauthorized access");
            throw new Error;
        }
    
    
        res.status(200).json({message:"Profile Deleted: ",foundProfile});
    
        console.log( `Profile Deleted`,foundProfile);

    } catch (error) {
        console.log(error);
        
    }

}

//select profile

export const selectProfile =async (req:any,res:Response) :Promise<void>=>{

    try {

        const {profileId} = req.body;
        const userId = req.userId;
    
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

        res.status(200).json({message:`Profile Selected `,token:token});
        console.log("Profile selected");

        
    } catch (error) {
        console.log(error)
    }
    
}