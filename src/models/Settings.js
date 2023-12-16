import { model, Schema } from "mongoose";

const SettingsSchema = new Schema({
    discountCobones: [
        {
            name: {
                type: String,
                required: true
            },
            value: {
                type: Number,
                required: true
            }
        }
    ],
    productsCategories: [String]
})

const SettingsModel = model("settings", SettingsSchema);

export default SettingsModel