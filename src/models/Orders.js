import { Schema, model } from "mongoose";
import { LocationSchema, PaymentMethodSchema } from "./Users.js";
import { RequiredNumber, ObjectId, RequiredObjectId, ANumber, RequiredString } from "../utilities/schemaTypesOptions.js";

const OrderSchema = new Schema(
    {
        userId: RequiredObjectId(),
        userData: {
            _id: ObjectId,
            userName: String,
            userEmail: String,
            avatar: String
        },
        location: { type: LocationSchema },
        totalPrice: RequiredNumber(),
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
            type: Date,
            required: true
        },
        expectedDeliveryDate: Date,
        deliveryPrice: ANumber(),
        discountCobone: {
            name: RequiredString(),
            value: RequiredNumber({ min: 0.01, max: 1 })
        }
    },
    { timestamps: true }
)

const OrdersModel = model("orders", OrderSchema);

export default OrdersModel;