
import jwt from "jsonwebtoken";

const SecretKey = "shubham";

export const createUserToken = (userId:any,email:any)=>{
    const token = jwt.sign({userId:userId,email:email},SecretKey);
    return token;
}

export const validateUserToken = (token:any)=>{
    const decoded = jwt.verify(token,SecretKey);
    return decoded;
}