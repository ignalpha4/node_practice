
import mongoose, { mongo } from "mongoose";


const cartSchema = mongoose.Schema({
    profileId:{
        type:String
    },
    items:[
        {
            productId:String,
            quantity:Number
        }
    ]
})

const cart = mongoose.model("cart",cartSchema);

export default cart;