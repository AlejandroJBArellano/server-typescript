import {Schema, model, Document} from "mongoose";
import ProfileSchema, {
    Profile
} from "./Profile";

const UserSchema = new Schema({
    pin: Number,
    completeName: String,
    perfil: ProfileSchema
})

export interface User extends Document{
    pin: number;
    completeName: string;
    perfil: Profile;
}

export default model("User", UserSchema)