import {Schema, model, Document} from "mongoose";
import { Menu } from "./Menu";

const ItemMenuSchema = new Schema({
    name: String,
    colorHex: String,
    price: Number,
    proveedor: String
}),

MenuSchema = new Schema({
    items: [ItemMenuSchema]
});

const ProfileSchema = new Schema({
    profileName: String,
    menu: [MenuSchema]
});

export interface Profile extends Document {
    profileName: String,
    menu: Menu
}

export default model<Profile>("Profile", ProfileSchema)