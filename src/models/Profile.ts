import {Schema, model, Document} from "mongoose";
import MenuSchema, { Menu } from "./Menu";


const ProfileSchema = new Schema({
    profileName: String,
    menu: MenuSchema
});

export interface Profile extends Document {
    profileName: String,
    menu: Menu
}

export default model<Profile>("Profile", ProfileSchema)