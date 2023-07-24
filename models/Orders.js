import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
    userId: { type: String },
    userData: { type: Object },
    location: { type: Object },
    totalPrice: { type: Object },
    products: { type: Array },
    paymentMethod: { type: Object },
    state: { type: String },
    deliveryDate: { type: String },
    deliveryPrice: { type: Object },
    discountCobone: { type: Object },
}, { timestamps: true } 
)

const OrdersModule = model("orders", OrderSchema);

export default OrdersModule;