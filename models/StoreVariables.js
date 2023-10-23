import { model, Schema } from "mongoose";

export const DiscoutCobone = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
})

const StoreVariablesSchema = new Schema({
    varName: String,
    cobones: [DiscoutCobone]
})

const StoreVariablesModule = model("storevariables", StoreVariablesSchema);

export default StoreVariablesModule