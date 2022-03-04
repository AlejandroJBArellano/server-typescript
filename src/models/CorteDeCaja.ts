import {Schema, model, Document } from "mongoose";
import { Order } from "./Order";
import { User } from "./User";

const CorteDeCajaSchema = new Schema({
    ordenesEfectivo: [
        {
            items: [{
            name: String,
            colorHex: String,
            price: Number,
            proveedor: String
            }],
            paymentType: String,
            userPin: Number,
            terminal: String
        }
    ],
    saldoInicialEfectivo: Number,
    ventasEfectivo: Number,
    faltanteOSobrante: Number,
    saldoEsperadoEfectivo: Number,
    saldoRealEfectivo: Number,
    retiroOAbonoEfectivo: Number,
    saldoFinalEfectivo: Number,
    user: {
        pin: Number,
        completeName: String,
        profileName: String,
    },
    terminal: String
}, {
    versionKey: false,
    timestamps: true
});

export interface CorteDecaja extends Document {
    ordenesEfectivo: Order[];
    saldoInicialEfectivo: number;
    ventasEfectivo: number;
    saldoEsperadoEfectivo: number;
    faltanteOSobrante: number;
    saldoRealEfectivo: number;
    retiroOAbonoEfectivo: number;
    saldoFinalEfectivo: number;
    user: User;
    terminal:String;
    createdAt: string;
}

export default model<CorteDecaja>("CorteDeCaja", CorteDeCajaSchema)