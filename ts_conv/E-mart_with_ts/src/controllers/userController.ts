
import { Request,Response } from "express"
import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import { IUserModel } from "../interfaces/userModelInterface";
import { createUserToken } from "../utils/userToken";

//sign up
export const userSignUp  = async(req:Request,res:Response) :Promise<void>=>{

    try {
        const {name,email,password} = req.body;
        // const user: IUsermodel = req.body

        const hashedPass:string = await bcrypt.hash(password,10);
    
        const newUser:IUserModel = await userModel.create({name,email,password:hashedPass});
    
        console.log("User added to db");
    
        res.status(200).json({message:"User added to db : \n",newUser});
    
    } catch (error) {
        console.log(error);
    }

}

//login
export const userLogin =async(req:Request,res:Response) :Promise<void> =>{
    try {

        const {email,password} = req.body;

        const foundUser : IUserModel | null = await userModel.findOne({email});

        if(!foundUser){
            console.log("Cannot find user");
            res.status(404).json({message:"Cannot find user with this email"});
            throw new Error;
        }
        
        const mathPass = await bcrypt.compare(password,foundUser.password);

        if(!mathPass){
            console.log("Incorrect Password");
            res.status(404).json({message:"Incorrect Password"});
            throw new Error;
        }

        //token generation with (email+userid)
        const token = createUserToken(foundUser._id,foundUser.email);

        res.status(200).json({message:"User Logged in Successfully \n",token:token});
        console.log("user logged in ");

    } catch (error) {
        console.log(error);
    }

}

// update user 
export const updateUser =async(req:any,res:Response) :Promise<void> =>{

    try {
        const userId = req.userId;

        console.log("user updated:",userId)

        const updatedUser : IUserModel | null = await userModel.findByIdAndUpdate(userId,req.body);
    
        res.status(200).json({message:"User updated ",updatedUser});
    } catch (error) {
        console.log(error);
    }
}
