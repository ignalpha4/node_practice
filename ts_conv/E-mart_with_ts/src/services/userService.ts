import { IUserModel } from "../interfaces/userModelInterface";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { createUserToken } from "../utils/userToken";
import { Request,Response } from "express"
import { ObjectId } from "mongoose";


export const userSignUpService=async(name:string,email:string,password:string) : Promise<IUserModel> =>{

    const hashedPass:string = await bcrypt.hash(password,10);
    
    const newUser:IUserModel = await userModel.create({name,email,password:hashedPass});

    return newUser;

}

export const userLoginService = async(email:string,password:string,req:Request,res:Response):Promise<String>=>{

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
    const token : String = createUserToken(foundUser._id,foundUser.email);

    return token;

}



export const updatedUser = async (userId :ObjectId,req:Request) : Promise<IUserModel |null>=>{

    console.log("updating the user with id: ",userId);

    const updatedUser : IUserModel | null = await userModel.findByIdAndUpdate(userId,req.body);

    return updatedUser;
}