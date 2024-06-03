

export const auth_middlewear = (req,res,next)=>{

    const username = req.body.username;
    const password= req.body.password;

    if(username=="shubham" && password == "12345"){
        next();
    }else{
        return res.status(400).send("incorrect username or password");
    }
}