import authorModel from "../models/authorModel";

export const addAuthor =async(req:any,res:any)=>{

    try {

        const author =req.body;

        const addedAuthor =await authorModel.create(author);
     
        if(!addedAuthor){
          console.log("provide the necessary details to add author ");
          res.status(400).json({message:"provide the necessary details to add author"})
        }
        console.log("Added author",author);
        res.status(200).json({message:"Author added",author:addedAuthor});

    } catch (error) {
        console.log(error);
    }
}

export const listAuthors = async(req:any,res:any)=>{
    try {

        const foundAuthors= await authorModel.find();

        if(!foundAuthors){
            console.log("No authors found ");
            res.status(400).json({message:"No authors found"})
        }

        console.log("List of Authors \n",foundAuthors);

        res.status(200).json({message:"List of Authors \n",authors:foundAuthors});

    } catch (error) {
        console.log(error);        
    }
}


export const deleteAuthor = async(req:any,res:any)=>{
    
    try{
        
        const {id} = req.body;

        const deletedAuthor = await authorModel.findByIdAndDelete(id);

        if(!deletedAuthor){
            console.log("No Author found to delete");
            res.status(400).json({message:"No author found to delete"})
        }

        console.log("Author Deleted \n",deletedAuthor);

        res.status(200).json({message:"Deleted Author \n",author:deletedAuthor});


    } catch (error) {
        console.log(error);
        
    }
}

export const updateAuthor=async(req:any,res:any)=>{

    const {id} = req.body;

    const updatedAuthor = await authorModel.findByIdAndUpdate(id,req.body);

    
    if(!updatedAuthor){
        console.log("No author found to update");
        res.status(400).json({message:"No author found to update"})
    }

    console.log("Author updated \n",updatedAuthor);

    res.status(200).json({message:" Author updated \n",author:updatedAuthor});

}