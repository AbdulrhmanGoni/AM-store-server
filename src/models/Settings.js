import { model, Schema } from "mongoose";

const SettingsSchema = new Schema({
    discountCobones: [
        {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            value: {
                type: Number,
                required: true
            },
            _id: false
        }
    ],
    productsCategories: [String]
})

const SettingsModel = model("settings", SettingsSchema);

export default SettingsModel