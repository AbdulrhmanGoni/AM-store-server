import { model, Schema } from "mongoose";

const ConstantsSchema = new Schema({
    cobones: { type: Object }
})

const ConstantsModule = model("constants", ConstantsSchema);

export default ConstantsModule