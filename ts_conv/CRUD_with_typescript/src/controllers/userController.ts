import { IUserSchema } from "../interfaces/userModel.interface";
import user from "../models/userModel";
import { Response, Request } from "express";

export const addUser = async (req: Request, res: Response) => {
    try { 
        const newUser = req.body;

        const createdUser: IUserSchema = await user.create(newUser);

        res.status(200).json({ message: "User created Successfully : ", createdUser });
        console.log("User created");

    } catch (error) {
        console.log(error);
    }

};

export const getUsers = async (req: Request, res: Response) => {

    try {
        const foundUsers = await user.find();

        res.status(200).json({ message: "List of found users: \n", foundUsers });
        console.log("users listed");

    } catch (error) {
        console.log(error);
        
    }

};

export const findUser = async (req: Request, res: Response) => {

    try {
        
        const { id } = req.params;

        const foundUser = await user.findById(id);
      
        if (!foundUser) {
          res.status(400).json({ message: "User with this id not found" });
        }
      
        res.status(200).json({ message: "found user is :", foundUser});

    } catch (error) {
        
        console.log(error);
        
        
    }

};

export const updateUser = async (req: Request, res: Response) => {

    try {
        
        const { id } = req.params;

        const updatedUser = await user.findByIdAndUpdate(id, req.body);
      
        res.status(200).json({message:"User info updated :",updatedUser});

    } catch (error) {
        console.log(error);
    }
 
};

export const deleteUser = async (req:Request,res:Response)=>{

    try {
        
        const {id} =req.params;
        const deletedUser = await user.findByIdAndDelete(id);
        console.log("User Deleted !!");
        res.status(200).json({message:"User deleted : ",deletedUser});

    } catch (error) {
        console.log(error);
    }

}
