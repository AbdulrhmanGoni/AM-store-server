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
        allowUsersChangePasswordEveryNDays: Number,
        defaultMonthlyTarget: Number,
        deliveryPrice: {
            type: {
                value: Number,
                limit: Number,
                _id: false
            }
        }
    },
    { versionKey: false }
)

const SettingsModel = model("settings", SettingsSchema);

export default SettingsModel