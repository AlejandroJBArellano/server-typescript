import mongoose, { CallbackWithoutResult, ConnectOptions } from "mongoose";
import keys from "./keys"

mongoose.connect(keys.uri)
    .then( e => console.log("DB is connected"))
    .catch( e => console.log(e));