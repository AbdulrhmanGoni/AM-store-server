import { Schema, model } from "mongoose";
import { LocationSchema, PaymentMethodSchema } from "./Users.js";
import { RequiredNumber, ObjectId, RequiredObjectId, ANumber } from "../utilities/schemaTypesOptions.js";
import { getDateAfterN } from "../utilities/dateMaker.js";

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
        paymentMethod: {
            type: Schema.Types.Mixed,
            enum: ["Cash", PaymentMethodSchema]
        },
        state: {
            type: String,
            enum: ["Completed", "Pending", "Canceled"],
            default: "Completed"
        },
        expectedDeliveryDate: {
            type: String,
            default: getDateAfterN(7),
        },
        deliveryPrice: ANumber(),
        discountCobone: {
            type: {
                name: String,
                value: Number
            }
        }
    },
    { timestamps: true, versionKey: false }
)

const OrdersModel = model("orders", OrderSchema);

export default OrdersModel;