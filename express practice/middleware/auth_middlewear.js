

export const  middle = (req,res,next)=>{

    const username=req.body.username;
    const password=req.body.password;

    if(username=="shubham" && password=="1234"){
        next();
    }
    else{
        return res.status(400).send("username or incorrect pass");
    }
}
