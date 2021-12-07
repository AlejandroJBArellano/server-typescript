import {Schema, model, Document } from "mongoose";

const ItemSchema = new Schema({
    name: String,
    colorHex: String,
    price: Number,
    proveedor: String
}, {
    versionKey: false
})

export interface Item extends Document {
    name: string;
    colorHex: string;
    price: number;
    proveedor: string;
}

export default model<Item>("Item", ItemSchema)
