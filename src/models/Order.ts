import {Schema, model, Document } from "mongoose";

const OrderSchema = new Schema({
    items: [{
        name: String,
        colorHex: String,
        price: Number,
        proveedor: String
    }],
    paymentType: {
        type: String,
        enum: ['Efectivo', 'Tarjeta'],
        default: 'Efectivo'
    },
    userPin: Number,
    terminal: String
}, {
    versionKey: false,
    timestamps: true
});

export interface Order extends Document {
    items: {    
        name: string;
        colorHex: string;
        price: number;
        proveedor: string;
    }[];
    paymentType: string;
    userPin: Number;
    Terminal: String;
}

export default model<Order>("Order", OrderSchema)