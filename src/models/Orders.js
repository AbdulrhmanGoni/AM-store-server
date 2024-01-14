import { Schema, model } from "mongoose";
import { LocationSchema, PaymentMethodSchema } from "./Users.js";
import { RequiredNumber, ObjectId, RequiredObjectId, ANumber } from "../utilities/schemaTypesOptions.js";

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
        expectedDeliveryDate: String,
        deliveryPrice: ANumber(),
        discountCobone: {
            name: String,
            value: ANumber({ min: 0, max: 1 })
        }
    },
    { timestamps: true }
)

const OrdersModel = model("orders", OrderSchema);

export default OrdersModel;