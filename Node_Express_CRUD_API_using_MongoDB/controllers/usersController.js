

import user from '../models/user.model.js';


export const getAllUsers= async(req,res)=>{
    
    console.log("getting all user info");
    
    const users = await user.find()
    res.send(users)
}


export const createUser=async (req,res)=>{
    const users= req.body;

    console.log(users);

    const createdUser = await user.create(users);

    console.log("User created",createdUser);

    res.send("User created");

}

export const findUser = async(req,res)=>{

    const {userid}= req.params;

    const founduser = await user.findById(userid)

    res.send(founduser)
 
}

export const deleteUser = async(req,res)=>{

    const {userid}= req.params
    
    const deletedUser = await user.findByIdAndDelete(userid)

    res.send(`User with id ${userid} deleted successfully`);

}

export  const updateUserInfo= async(req,res)=>{

    let {userid}=req.params;  //gets id which is passed in the req parameters


    let usertoupdate = await user.findByIdAndUpdate(userid,req.body);
    
    res.send(`user with the id ${usertoupdate.id} is updated`);
}