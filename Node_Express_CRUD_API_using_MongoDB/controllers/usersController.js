

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

    let {username,password,gender}=req.body; //gives the username pass or gender whatever is present

    
    let usertoupdate = await user.findById(userid)
    
    if(username){
        usertoupdate.username=username;
    }

    if(password){
        usertoupdate.password=password;
    }
    
    if(gender){
        usertoupdate.gender=gender;
    }

    await usertoupdate.save();

    res.send(`user with the id ${usertoupdate.id} is updated`);
}