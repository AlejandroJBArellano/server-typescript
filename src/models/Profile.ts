import {Schema, model, Document} from "mongoose";
import { Menu } from "./Menu";

const ProfileSchema = new Schema({
    profileName: String,
    menu: {
        type: Schema.Types.ObjectId,
        ref: "Menu"
    }
}, {
    versionKey: false
});

export interface Profile extends Document {
    profileName: String,
    menu: Menu
}

export default model<Profile>("Profile", ProfileSchema)