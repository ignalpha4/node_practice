
import { uuid } from 'uuidv4';

let users =[];

export const getAllUsers= (req,res)=>{
    console.log(users);
    res.send(users);
}


export const createUser= (req,res)=>{
    const user= req.body;
    users.push({...user, id:uuid()}); //adding id to object and then pushing it
    res.send(`User with first name ${user.firstname} added to the database`);
}

export const findUser = (req,res)=>{

    const userid= req.params.id;
    
    const found_user= users.find((user)=>{
        if(user.id==userid){
            return user;
        };
    });

    res.send(found_user);
 
}

export const deleteUser = (req,res)=>{

    let userid=req.params.id;
    
    users = users.filter((user)=>user.id!==userid);

    res.send(`User with id ${userid} deleted successfully`);

}

export  const updateUserInfo= (req,res)=>{

    let userid=req.params.id;  //gets id which is passed in the req parameters

    let {firstname,lastname,age}=req.body; //gives the firstname lname or age whatever is present

    
    let user = users.find((user)=>user.id==userid); //gets the user object with specific id
    
    if(firstname){
        user.firstname=firstname;
    }

    if(lastname){
        user.lastname=lastname;
    }
    
    if(age){
        user.age=age;
    }

    res.send(`user with the id ${user.id} is updated`);
}