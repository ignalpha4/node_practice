import user from "../models/user.model.js"

export const getUsers =async(req,res,next)=>{

    try{
        const users = await user.find();

        console.log(users);
    
        res.send(users);
    }catch(err){
        next(err); //passing to the next errorhandler middleware
    }

}

export const createUser = async(req,res,next)=>{

    try{
        const new_user =  req.body;

        const created_user = await user.create(new_user);
    
        console.log("user added",created_user);
    
        res.send("New user created successfully");
    }catch(err){
        next(err);
    }


}

export const findUser = async(req,res,next)=>{

    try{
        const {user_id} = req.params;

        const found_user = await user.findById(user_id);

        if (!found_user){
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
    
        console.log("Found user ",found_user);
    
        res.send(found_user);
    }catch(err){
        next(err);
    }
}


export const deleteUser=async(req,res,next)=>{

    try{
        const {user_id} =req.params;

        const deleted_user = await user.findByIdAndDelete(user_id);

        if (!deleted_user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
    
        console.log("user deleted")
    
        res.send(`user deleted : ${deleted_user}`)
    }catch(err){
        next(err);
    }
}


export const updateUser = async(req,res,next)=>{

    try{
        const {user_id} =req.params;

        const {username,password,gender} = req.body;
    
    
        const updated_user = await user.findById(user_id);

        if(!updateUser){
            const error = new Error("User not found");
            error.status=404;
            throw error;
        }
    
        if(username){
            updated_user.username = username;
        }
    
        if(password){
            updated_user.password = password;
        }
    
        if(gender){
            updated_user.gender = gender;
        }
    
        await updated_user.save();
    
        res.send(`user with the id ${updated_user.id} is updated`);

    }catch(err){
        next(err);
    }

}

