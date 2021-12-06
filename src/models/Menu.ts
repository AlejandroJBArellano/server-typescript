import {Schema, model, Document } from "mongoose";
import ItemSchema, {Item} from "./Item";

const ItemMenuSchema = new Schema({
    name: String,
    colorHex: String,
    price: Number,
    proveedor: String
}),

MenuSchema = new Schema({
    items: [ItemMenuSchema]
});

export interface Menu extends Document {
    items: Item[];
}

export default model<Menu>("Menu", MenuSchema)