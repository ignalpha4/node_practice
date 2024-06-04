import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req,res,next)=>{

    const token=req.headers.authorization?.split(' ')[1];
    // console.log(token);

    if(!token){
        res.status(401).json({message:"Token Required"});
    }

    const decoded = verifyToken(token);

    req.user = decoded
    next()  
}