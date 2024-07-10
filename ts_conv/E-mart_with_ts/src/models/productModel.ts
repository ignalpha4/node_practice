import mongoose from "mongoose";
import { IProduct } from "../interfaces/productModelInterface";

const productSchema = new mongoose.Schema<IProduct>({
    
    productName:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    productCategory:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    }
})
const products = mongoose.model<IProduct>('product',productSchema);
export default products;
