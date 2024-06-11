//name, biography, and nationality
import mongoose, { mongo } from "mongoose"
import { IAuthorSchema } from "../interfaces/authorModelInterface";


const authorSchema = new mongoose.Schema<IAuthorSchema>({
    name:{
        type:String,
        required:true
    },
    biography:{
        type:String,
    },
    nationality:{
        type:String,
    
    }
}) 

const authorModel = mongoose.model<IAuthorSchema>('author',authorSchema);

export default authorModel;