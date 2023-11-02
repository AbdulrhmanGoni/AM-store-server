import { model, Schema } from "mongoose";

export const DiscoutCobone = {
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}

const SettingsSchema = new Schema({
    cobones: [DiscoutCobone],
    productsCategories: [String] 
})

const SettingsModule = model("settings", SettingsSchema);

export default SettingsModule