import {Schema, model, Document} from "mongoose";

const UserSchema = new Schema({
    pin: Number,
    completeName: String,
    profileName: String,
}, {
    versionKey: false
});

export interface User extends Document {
    pin: number;
    completeName: string;
    profileName: string;
}

export default model("User", UserSchema)