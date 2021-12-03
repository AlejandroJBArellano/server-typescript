import {Schema, model, Document } from "mongoose";
import ItemSchema, { Item } from "./Item";
import UserSchema, { User } from "./User";

const OrderSchema = new Schema({
    items: [ItemSchema],
    paymentType: String,
    user: UserSchema,
    Terminal: String
});

export interface Order extends Document {
    items: Item[];
    paymentType: String;
    user: User;
    Terminal: String;
}

export default model<Order>("Order", OrderSchema)