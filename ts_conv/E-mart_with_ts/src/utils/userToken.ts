
import jwt, { JwtPayload } from "jsonwebtoken";

const SecretKey = "shubham";

export const createUserToken = (userId:any,email:any) :String =>{
    const token : String= jwt.sign({userId:userId,email:email},SecretKey);
    return token;
}

export const validateUserToken = (token:any) :any=>{
    const decoded :JwtPayload | string= jwt.verify(token,SecretKey);
    return decoded;
}

