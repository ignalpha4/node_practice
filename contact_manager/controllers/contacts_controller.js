

export const get_contacts = (req,res)=>{
    
    const {name,email,phone} = req.body;

    if(!name || !email ||!phone){
        res.status(400);
        throw new Error("All fields are mandatoy");
    }


}

export const add_contact=(req,res)=>{
    res.send("add contacts");
}

export const get_contact_with_id =(req,res)=>{
    res.send(`show  contacts with id ${req.params.id}`);
}

export const update_contact=(req,res)=>{
    res.send(`update contact with id ${req.params.id}`);
}

export const delete_contact=(req,res)=>{
    res.send(`delete contact with id ${req.params.id}`);
}