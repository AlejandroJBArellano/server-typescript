import {Schema, model, Document} from "mongoose";
import { Profile } from "./Profile";

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
}),

UserSchema = new Schema({
    pin: Number,
    completeName: String,
    perfil: ProfileSchema
});

export interface User extends Document{
    pin: number;
    completeName: string;
    perfil: Profile;
}

export default model("User", UserSchema)