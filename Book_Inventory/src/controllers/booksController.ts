import authorModel from "../models/authorModel";
import bookModel from "../models/bookModel";

export const addBook =async(req:any,res:any)=>{

    try {
        const book =req.body;

        if(req.role =="author"){
            book.author = req.name;
        }
   
        const addedBook =await bookModel.create(book);
     
        if(!addedBook){
          console.log("provide the necessary details to add ");
          res.status(400).json({message:"provide the necessary details to add"})
        }
        console.log("Added Book",book);
        res.status(200).json({message:"Book added",book:addedBook});

    } catch (error) {
        console.log(error);
    }
}

export const listBooks = async(req:any,res:any)=>{
    try {

        let foundBooks;
        if(req.role=="author"){
            const authorName = req.name;
            foundBooks= await bookModel.find({author:authorName});
        }else{
            foundBooks= await bookModel.find();
        }

        if(!foundBooks){
            console.log("No books found ");
            res.status(400).json({message:"No books found"})
        }

        console.log("Available Books \n",foundBooks);

        res.status(200).json({message:"Available Books \n",books:foundBooks});

    } catch (error) {
        console.log(error);        
    }
}


export const deleteBook = async(req:any,res:any)=>{
    
    try{
        
        const {id} = req.body;

        let deletedBook;

        const foundbook:any = await bookModel.findById(id);

        if(req.role=="author"){

            if(req.name== foundbook.author){
                deletedBook = await bookModel.findByIdAndDelete(id);

                console.log("Book deleted",deletedBook);
                res.status(400).json({message:"Book Deleted",book:deletedBook})

            }else{
                console.log("Author not authorized to delete the book");
                res.status(400).json({message:"Author not authorized to delete the book"})
            }
         
        }
        else{

            deletedBook = await bookModel.findByIdAndDelete(id);

            if(!deletedBook){
                console.log("No books found to delete");
                res.status(400).json({message:"No books found to delete"})
            }
    
            console.log("Book Deleted \n",deletedBook);
    
            res.status(200).json({message:"Deleted Book \n",book:deletedBook});
    
        }
    } catch (error) {
        console.log(error);
        
    }
}

export const updateBook=async(req:any,res:any)=>{

    try {

        let updatedBook;

        const {id} = req.body;
    
        const foundbook :any= await bookModel.findById(id);
    
        if(req.role=="author"){
    
            if(req.name== foundbook.author){
    
                req.body.author = req.name;
    
                updatedBook = await bookModel.findByIdAndUpdate(id,req.body);
    
                console.log("Book Updated",updatedBook);
                res.status(400).json({message:"Book Updated",book:updatedBook})
    
            }else{
                console.log("Author not authorized to update the book");
                res.status(400).json({message:"Author not authorized to update the book"})
            }
    
        }else{
    
            
        updatedBook = await bookModel.findByIdAndUpdate(id,req.body);
    
        
        if(!updatedBook){
            console.log("No books found to update");
            res.status(400).json({message:"No books found to update"})
        }
    
        console.log("Book updated \n",updatedBook);
    
        res.status(200).json({message:" Book updated \n",book:updatedBook});
    
        }
        
    } catch (error) {
        console.log(error);
    }
}