import {Schema, model, Document } from "mongoose";
import { Item } from "./Item";
import { User } from "./User";

const ItemMenuSchema = new Schema({
    name: String,
    colorHex: String,
    price: Number,
    proveedor: String
}),

MenuSchema = new Schema({
    items: [ItemMenuSchema]
}),

ProfileSchema = new Schema({
    profileName: String,
    menu: [MenuSchema]
}),

UserSchema = new Schema({
    pin: Number,
    completeName: String,
    perfil: ProfileSchema
}),

OrderSchema = new Schema({
    items: [ItemMenuSchema],
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