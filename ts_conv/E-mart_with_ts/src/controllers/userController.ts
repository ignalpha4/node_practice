
import { Request,Response } from "express"
import { userLoginService, userSignUpService } from "../services/userService";

//sign up
export const userSignUp  = async(req:Request,res:Response) :Promise<void>=>{

    try {
        const {name,email,password} = req.body;
        // const user: IUsermodel = req.body

        const newUser= await userSignUpService(name,email,password);
    
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

        //token generation with (email+userid)
        const token =  await userLoginService(email,password,req,res);

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

        const updatedUser = await updateUser(userId,req);
    
        res.status(200).json({message:"User updated ",updatedUser});
    } catch (error) {
        console.log(error);
    }
}