
import { JwtPayload } from "jsonwebtoken";
import { userTokenClass } from "../utils/userToken";
import { Request,Response,NextFunction } from "express";

//obj of userTokenClass

const userTokenObj = new userTokenClass();

export class userAuthentication{


      authUser = (req:any,res:Response,next:NextFunction) =>{
        try {
            
            const token = req.headers.authorization?.split(' ')[1];
    
            console.log("the token that we got from user",token);
            
        
            if(!token){
                console.log("No token Found");
                res.status(200).json({message:"NO token provided"});
                throw new Error;
            }
        
            const decoded :JwtPayload = userTokenObj.validateUserToken(token);
    
            if(!decoded){
                console.log("incorrect token provided");
                res.status(400).json({message:"Invalid token"});
                throw new Error
            }
        
            console.log("token contains: ",decoded);
        
            req.userId = decoded.userId;
            req.email = decoded.email;
        
            next();
    
        } catch (error) {
            console.log(error);
        }
    }
}

