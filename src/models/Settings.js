import { model, Schema } from "mongoose";
import { RequiredNumber, RequiredString } from "../utilities/schemaTypesOptions.js";

const SettingsSchema = new Schema(
    {
        discountCobones: [
            {
                id: RequiredString(),
                name: RequiredString(),
                value: RequiredNumber({ min: 0.01, max: 1 }),
                _id: false
            }
        ],
        productsCategories: [String],
        allowUsersChangePasswordEveryNDays: {
            type: Number,
            default: 30
        },
        defaultMonthlyTarget: Number,
        deliveryPrice: {
            type: Number,
            default: 5
        },
        minFreeDeliveryEntitlementPrice: Number
    },
    { versionKey: false }
)

const SettingsModel = model("settings", SettingsSchema);

export default SettingsModel