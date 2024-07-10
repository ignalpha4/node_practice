import mongoose from "mongoose";
import { ICartModel } from "../interfaces/cartModelInteface";

const cartSchema = new mongoose.Schema<ICartModel>({
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: {
                type: Number
            }
        }
    ]
}, { timestamps: true });

const cartModel = mongoose.model<ICartModel>("cart", cartSchema);

export default cartModel;
