
import { Request,Response } from "express"
import products from "../models/productModel"


export class ProductsController{

    
    viewProducts=async(req:Request,res:Response)=>{
        const productsList = await products.find();
        res.json({productsList});
    }

}
