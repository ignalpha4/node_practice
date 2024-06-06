import { validateToken } from "../utils/jwt.js";


export const authenticate=(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        res.status(404).json({message:"token not found"});
    }

    const decoded = validateToken(token);

    if(!decoded){
        console.log("token not valid");
        res.status(400).json({message:"token not valid"});
        throw new Error;
    }

    //creating the key value in  req so that it can be used to identify the user
    req.user = decoded;

    //now req.user will have the userId which can be used to identify the user for further operations

    next();

    } catch (error) {
        console.log(error);
    }
    
}