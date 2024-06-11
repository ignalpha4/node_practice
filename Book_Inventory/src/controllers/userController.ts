
import { Request,Response } from "express"
import userModel from "../models/userModel"
import bcrypt from "bcrypt"
import { IUserModel } from "../interfaces/userModelInterface";
import { generateUserToken } from "../utils/userToken";


//user signup
export const signUp =async(req:any,res:Response)=>{

    try {
        
        const {name,email,password,role} = req.body;

        const hashedPassword  = await bcrypt.hash(password,10);
    
    
        const createdUser = await userModel.create({name,email,password:hashedPassword,role});
    
        if(!createdUser){
            console.log("error creating the user");
            req.status(401).json({message:"User creation Error"});
        }
    
        console.log("User SignUp successfull !");
        res.status(200).json({message:"User SignUp successfull !"});

    } catch (error) {
        console.log(error);
    }
}


//user login
export const login=async(req:any,res:Response)=>{

    try {

        const {email,password} = req.body;

        const foundUser= await userModel.findOne({email});

        if(!foundUser){
            console.log("No user found with this email");
            res.status(404).json({message:"user not found with this email!"});
        }

        const foundUserPass:any= foundUser?.password;

        const matchedPassword = await bcrypt.compare(password,foundUserPass);

        if(!matchedPassword){
            console.log("Incorrect Password");
            res.status(404).json({message:"Incorrect Password"});
        }

        const payload={
            name:foundUser?.name,
            id:foundUser?._id,
            role:foundUser?.role
        }

        const token = await generateUserToken(payload);

        console.log("User logged In");
        res.status(200).json({message:"User logged In successfully",token:token});

    } catch (error) {
        console.log(error);
    }

}