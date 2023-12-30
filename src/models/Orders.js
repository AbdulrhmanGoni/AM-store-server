import { Schema, Types, model } from "mongoose";
import { LocationSchema, PaymentMethodSchema } from "./Users.js";

const OrderSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            required: true
        },
        userData: {
            _id: Types.ObjectId,
            userName: String,
            userEmail: String,
            avatar: String
        },
        location: { type: LocationSchema },
        totalPrice: {
            type: Number,
            required: true
        },
        products: {
            type: [String],
            required: true
        },
        paymentMethod: { type: PaymentMethodSchema },
        state: {
            type: String,
            enum: ["Completed", "Pending", "Canceled"],
            default: "Pending"
        },
        deliveryDate: {
            type: String,
            required: true
        },
        expectedDeliveryDate: String,
        deliveryPrice: {
            type: Number,
            default: 0
        },
        discountCobone: { name: String, value: Number }
    },
    { timestamps: true }
)

const OrdersModel = model("orders", OrderSchema);

export default OrdersModel;