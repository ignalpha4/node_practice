import { validateTokenProfile } from "../utils/jwt_profile.js";


export const auth_profile=(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];

 

    if(!token){
        res.status(404).json({message:"token not found"});
    }

    const decoded = validateTokenProfile(token);


    if(!decoded){
        console.log("token not valid");
        res.status(400).json({message:"token not valid"});
        throw new Error;
    }
   
    console.log("This is decoded part ",decoded);
    req.profile = decoded.profileId;
    req.userId =decoded.userId;
    req.email = decoded.email;

    next();

    } catch (error) {
        console.log(error);
    }
    
}