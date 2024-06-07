
import jwt, { JwtPayload } from "jsonwebtoken";

const SecretKey = "shubham";

export const createProfileToken = (profileId:any,email:any)=>{
    const token = jwt.sign({profileId:profileId,email:email},SecretKey);
    return token;
}

export const validateProfileToken = (token:any)=>{
    const decoded : JwtPayload | string = jwt.verify(token,SecretKey);
    return decoded;
}