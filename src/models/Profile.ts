import {Schema, model, Document} from "mongoose";

const ProfileSchema = new Schema({
    profileName: String,
    menuId: {
        type: Schema.Types.ObjectId,
        ref: "Menu"
    }
}, {
    versionKey: false
});

export interface Profile extends Document {
    profileName: String,
    menuId: string;
}

export default model<Profile>("Profile", ProfileSchema)