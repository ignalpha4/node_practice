
import jwt, { JwtPayload } from "jsonwebtoken";

const SecretKey = "shubham";

export const createUserToken = (userId:any,email:any) :string =>{
    const token = jwt.sign({userId:userId,email:email},SecretKey);
    return token;
}

export const validateUserToken = (token:any) :any=>{
    const decoded :JwtPayload | string= jwt.verify(token,SecretKey);
    return decoded;
}

