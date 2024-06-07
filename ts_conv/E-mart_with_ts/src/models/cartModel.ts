import mongoose from "mongoose";
import { ICartModel } from "../interfaces/cartModelInteface";

const cartSchema = new mongoose.Schema<ICartModel>({

    profileId:{
        type:String,
        required:true
    },
    items:[
        {
            productId:{
                type:String,
      
            },
            quantity:{
                type:Number
            },
            productName:{
                type:String,
       
            }
        }
    ]

},{timestamps:true});


const cartModel = mongoose.model<ICartModel>("cart",cartSchema);

export default cartModel;