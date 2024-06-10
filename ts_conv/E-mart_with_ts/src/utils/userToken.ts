
import jwt, { JwtPayload } from "jsonwebtoken";

const SecretKey = "shubham";


export class userTokenClass{

   createUserToken = (userId:any,email:any) :String =>{
        const token : String= jwt.sign({userId:userId,email:email},SecretKey);
        return token;
    }
    
    validateUserToken = (token:any) :any=>{
        const decoded :JwtPayload | string= jwt.verify(token,SecretKey);
        return decoded;
    }
    
}


