import {Schema, model, Document } from "mongoose";
import OrderSchema, { Order } from "./Order";
import UserSchema, { User } from "./User";

const CorteDeCajaSchema = new Schema({
    OrdenesEfectivo: [OrderSchema],
    SaldoInicialEfectivo: Number,
    VentasEfectivo: Number,
    SaldoEsperadoEfectivo: Number,
    SaldoRealEfectivo: Number,
    RetiroOAbonoEfectivo: Number,
    SaldoFinalEfectivo: Number,
    user: UserSchema,
    Terminal: String
});

export interface CorteDecaja extends Document {
    OrdenesEfectivo: Order[];
    SaldoInicialefectivo: Number;
    VentasEfectivo: Number;
    SaldoEsperadoEfectivo: Number;
    SaldoRealEfectivo: Number;
    RetiroOAbonoEfectivo: Number;
    SaldoFinalEfectivo: Number;
    user: User;
    Terminal:String;
}

export default model<CorteDecaja>("CorteDeCaja", CorteDeCajaSchema)