import { JwtPayload } from "jsonwebtoken";
import { validateUserToken } from "../utils/userToken";
import { NextFunction } from "express";


export const authUser=(req:any,res:any,next:NextFunction)=>{

    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        console.log("No token Provided for authentication !");
        res.status(404).json({message:"No token provided"});
    }

    const decoded = validateUserToken(token);

    console.log("decoded token",decoded);

    req.userId = decoded.id;
    req.role =decoded.role;
    req.name = decoded.name;

    next();
}

export const authAdmin = (req:any,res:any,next:NextFunction)=>{

    if(req.role=="admin"){
        next();
    }else{
        console.log("User not authorized to access");
        res.status(401).json({message:"Unauthorized"});
    }
}