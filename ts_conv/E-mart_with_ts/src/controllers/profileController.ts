import { Response } from "express"
import { IProfileModel } from "../interfaces/profileModelInterface";
import { addProfileService, deleteProfileService, listProfilesService, selectProfileService } from "../services/profileService";


//adding profile
export const addProfile = async(req:any,res:Response) :Promise<void> =>{

    try {

        const userId = req.userId;
        const {profileName} = req.body;
    
    
        //calling the service
        const  createdProfile :IProfileModel = await addProfileService(userId,profileName,res);
    
    
        res.status(400).json({message:"Profile Created: ",createdProfile});
        console.log("Profile Created");
        
    } catch (error) {
        console.log(error);
    }


    
}

//list profiles

export const listProfiles = async(req:any,res:Response): Promise<void> =>{

    const userId = req.userId;

    console.log("Finding users for this Id",userId);

    //calling service
    const foundProfiles = await listProfilesService(userId);

    res.status(200).json({message:"List of profiles for this user : ",foundProfiles});
    console.log("Profiles listed");
}


//delete profile

export const deleteProfile = async(req:any,res:Response) :Promise<void>=>{

    try {
        
        const {profileId} = req.body;
        const userId = req.userId;
    
        const foundProfile = await deleteProfileService(profileId,userId,res);
    
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

        const token = await selectProfileService(profileId,userId,res);

        res.status(200).json({message:`Profile Selected `,token:token});
        console.log("Profile selected");

    } catch (error) {
        console.log(error)
    }
    
}