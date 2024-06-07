
import jwt from "jsonwebtoken";

const SecretKey = "shubham";

export const createProfileToken = (profileId:any,email:any)=>{
    const token = jwt.sign({profileId:profileId,email:email},SecretKey);
    return token;
}

export const validateProfileToken = (token:any)=>{
    const decoded = jwt.verify(token,SecretKey);
    return decoded;
}