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

        const createCart = await cart.create({profileId:addedProfile._id});

        console.log(`profile added for user ${userId}`);

        res.status(200).json({message:"profile added"});

    } catch (error) {
        console.log(error);
    }
}

//lisiting all profiles for logged in user
export const listProfiles=async(req,res)=>{

    try {
        
        const userId = req.user;

        const foundProfiles = await profiles.find({userId});

        console.log("List of Profiles of user : \n",foundProfiles);

        res.status(200).json({message:"List of Profiles of User : \n",foundProfiles});


    } catch (error) {
        console.log(error);
    }


}


export const selectprofile =async(req,res)=>{

    try {
        
        const userId = req.user;
        const {profileId} = req.body;

        //finding users email so to use it to gen token
        const foundUser = await user.findById(userId);

        const selectedProfile = await profiles.findById(profileId);

        if(userId != selectedProfile.userId){
            console.log("You are not authorized to access this profile");
            res.status(400).json({message:"You are not authorized to access this profile"});
        }

        console.log("selected profile:\n",selectedProfile);


        //passing userid,profile id,email to gen tokens

        const token_obj = {
            profileId:selectedProfile._id,
            userId:userId,
            email:foundUser.email
        }

        const token = generateTokenProfile(token_obj);

        res.status(200).json({message:"Profile selected",token:token});

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