import {Schema, model, Document} from "mongoose";
import { Profile } from "./Profile";

const UserSchema = new Schema({
    pin: Number,
    completeName: String,
    perfil: {
        type: Schema.Types.ObjectId,
        ref: "Profile"
    }
}, {
    versionKey: false
});

export interface User extends Document{
    pin: number;
    completeName: string;
    perfil: Profile;
}

export default model("User", UserSchema)