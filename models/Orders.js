import { Schema, Types, model } from "mongoose";
import { LocationSchema, PaymentMethodSchema } from "./Users.js";

const OrderSchema = new Schema(
    {
        userId: Types.ObjectId,
        userData: {
            _id: Types.ObjectId,
            userName: String,
            userEmail: String,
            avatar: String
        },
        location: LocationSchema,
        totalPrice: Number,
        products: [String],
        paymentMethod: PaymentMethodSchema,
        state: {
            type: String,
            enum: ["Completed", "Pending", "Canceled"],
            default: "Pending"
        },
        deliveryDate: String,
        expectedDeliveryDate: String,
        deliveryPrice: {
            type: Number,
            default: 0
        },
        discountCobone: { name: String, value: Number }
    },
    { timestamps: true }
)

const OrdersModule = model("orders", OrderSchema);

export default OrdersModule;