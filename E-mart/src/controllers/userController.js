import {user} from "../models/userModels.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt"

export const userSignup =async (req,res)=>{

    try { 

        const {name,email,password,profiles}  = req.body;

        const hashedPassword =  await bcrypt.hash(password,10);

        const newUser = {name,email,password:hashedPassword,profiles};

        const created_user = await user.create(newUser);

        if(!created_user){
            console.log("Cannot create user ");
            throw new Error("User cannot be created");
        }

        console.log("SignUp successfull !!");
        res.status(200).json({message:"singup done"});

    } catch (error) {
        console.log(error);        
    }
}

export const userLogin = async (req,res)=>{

    try {
        
        const {email,password} = req.body;

        const foundUser = await user.findOne({email});

        if(!foundUser){
            console.log("Cannot find user with this email");
            res.status(404).json({message:"Cannot find user with this email"});
        }

        const matchPass = await bcrypt.compare(password,foundUser.password);

        if(matchPass){

            const token = generateToken(foundUser._id);

            console.log("User Login Done!!");
            res.status(200).json({message:"Login successfull !!!",token:token});
        }else{
            console.log("incorrect pass!!");
            res.status(200).json({message:"password incorrect!!!"});
        }

    } catch (error) {   
        console.log(error);
    }
}


export const getInfo =async (req,res)=>{

    const userId = req.user;

    const foundUser = await user.findById(userId);

    if(!foundUser){
        console.log("User doesnt Exist");
        res.status(404).json({message:"user doesnt exist"});
    }
    console.log("Fetched User Info Successfully !!");
    res.status(200).json({user:foundUser});

}

export const updateUser = async (req,res)=>{

    try {
        
        const userId = req.user ;

        const foundUser = await user.findById(userId);
    
        const {name,email,password} = req.body;

        if(!name && !email && !password){
            console.log("no info to update");
            res.status(200).json({message:"no info provided to update"});
        }
    
        if(name){
            foundUser.name = name;
        }
        if(email){
            foundUser.email = email;
        }
    
        if(password){
            const hashedPassword = await bcrypt.hash(password,10);
            foundUser.password = hashedPassword;
        }

        res.status(200).json({message:"info updated successfully !!"});
    

    } catch (error) {
        console.log(error)
    }
   
}


export const deleteUser=async(req,res)=>{

    try {
        const userId = req.user;

        const userDeleted = await user.findByIdAndDelete(userId);
    
        if(!userDeleted){
            console.log("cannot find user to delete");
            res.status(200).json({message:"cannot find user to delete"});
            throw new Error;
        }   
    
        console.log("User deleted !!");
        res.status(200).json({message:"user deleted"});
    } catch (error) {
        console.log(error);
    }
    
}

