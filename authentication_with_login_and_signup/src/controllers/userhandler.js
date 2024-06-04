import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { userDetails } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";

export const signupHandler=async(req,res)=>{

    try {
        const {name, email,password} = req.body;

        const hashed_pass = await bcrypt.hash(password,10);

        const user_data = {
            name,email,password:hashed_pass
        };

        const new_user = await userDetails.create(user_data);


        res.status(200).json({message:"Signup done"});
        
    } catch (error) {
        
        console.log(error);

    }

}

export const loginHandler=async(req,res)=>{

    try{
        const {email,password} = req.body;

        const user_info = await userDetails.findOne({email});
        console.log(user_info);

        if(!user_info){
            res.status(404).json({message:"User not found"});
            throw new Error("User not found");
        }

        const match_pass = await bcrypt.compare(password,user_info.password);

        if(match_pass){

            const token = generateToken(user_info._id);
                    
            res.status(200).json({message:"Login successfull!!",token})
        }else{
            res.status(401).json({message:"Login Failed!!"})
        }

        user_info.isLoggedIn = true ;

        await user_info.save();

    }catch(error){
        console.log(error);
    }
}
