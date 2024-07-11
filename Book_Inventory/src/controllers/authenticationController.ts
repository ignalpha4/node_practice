
import {Response} from "express"
import userModel from "../models/userModel"
import bcrypt from "bcrypt"
import { generateUserToken } from "../utils/userToken";
import authorModel from "../models/authorModel";

//user signup
export const signup =async(req:any,res:Response)=>{
    try {
        
        const {email,password,role} = req.body;

        const hashedPassword  = await bcrypt.hash(password,10);
    
        const createdUser = await userModel.create({email,password:hashedPassword,role});
    
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


export const authorSignup = async(req:any,res:Response)=>{

    try {

        let role="author";

        const {email,password,name,biography,nationality} = req.body;


        const hashedPassword  = await bcrypt.hash(password,10);
    
        const createdUser = await userModel.create({email,password:hashedPassword,role});

        const createdAuthor = await authorModel.create({nationality,biography,name,userId:createdUser._id});


        if(!createdUser){
            console.log("error creating the user");
            req.status(401).json({message:"User creation Error"});
            throw new Error;
        }

        if(!createdAuthor){
            console.log("unable to create author");

            if(createdUser){
                await userModel.findByIdAndDelete(createdUser._id);
            }

            req.status(401).json({message:"author creation error"});
        }

        console.log("Author SignUp successfull !");
        res.status(200).json({message:"Author SignUp successfull !"});

    } catch (error) {
        console.log(error);
        
    }
}

//user login
export const login = async(req:any,res:Response)=>{
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
            email:foundUser?.email,
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