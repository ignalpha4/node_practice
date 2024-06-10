
import { profileTokenClass } from "../utils/profileToken";
import { Request,Response,NextFunction } from "express";

const profileTokenObj =  new profileTokenClass();


export class profileAuthentication{
    
    authProfile = (req:any,res:Response,next:NextFunction) =>{

        try {
            
            const token = req.headers.authorization?.split(' ')[1];
    
            console.log("the token that we got from profile",token);
            
        
            if(!token){
                console.log("No token Found");
                res.status(200).json({message:"NO token provided"});
                throw new Error;
            }
        
            const decoded :any = profileTokenObj.validateProfileToken(token);
    
            if(!decoded){
                console.log("incorrect token provided");
                res.status(400).json({message:"Invalid token"});
                throw new Error
            }
        
            console.log("token contains: ",decoded);
        
            req.profileId = decoded.profileId;
            req.email = decoded.email;
        
            next();
    
        } catch (error) {
            console.log(error);
        }
    }
}

