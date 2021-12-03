import {Schema, model, Document } from "mongoose";
import ItemSchema, {Item} from "./Item";

const MenuSchema = new Schema({
    items: [ItemSchema]
}, {
    versionKey: false
})

export interface Menu extends Document {
    items: Item[];
}

export default model<Menu>("Menu", MenuSchema)