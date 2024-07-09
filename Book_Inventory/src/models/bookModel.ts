//title, author, category, ISBN, description, and price
import mongoose, { mongo, Schema } from "mongoose"
import { IBookModel } from "../interfaces/bookModelInterface";

const bookSchema = new mongoose.Schema<IBookModel>({
    title:{
        type:String,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,ref:'author',
        required:true
    },
    category:{
        type:String,
        required:true
    }, 
    ISBN:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    }
}) 

const bookModel = mongoose.model<IBookModel>('book',bookSchema);

export default bookModel;