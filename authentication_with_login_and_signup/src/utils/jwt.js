 import jwt from "jsonwebtoken";
//  import { userDetails } from "../models/user.model";

 const secretKey = "shubham";


 export const generateToken =(user_id) =>{
    
    return jwt.sign({userId: user_id},secretKey);

}


export const verifyToken =(token) =>{

    try {
        
        const decodedToken = jwt.verify(token,secretKey);
        
        return decodedToken.userId

    } catch (error) {
        console.log("cannot verify")
    }

}