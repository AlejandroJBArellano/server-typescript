import {Schema, model, Document } from "mongoose";
import { Item } from "./Item";
import { User } from "./User";

const OrderSchema = new Schema({
    items: [{
        type: Schema.Types.ObjectId, 
        ref: "Item"
    }],
    paymentType: String,
    userPin: Number,
    Terminal: String
}, {
    versionKey: false
});

export interface Order extends Document {
    items: {_id: string}[];
    paymentType: String;
    userPin: Number;
    Terminal: String;
}

export default model<Order>("Order", OrderSchema)