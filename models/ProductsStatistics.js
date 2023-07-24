import { model, Schema } from "mongoose";

const ProductsStatisticsSchema = new Schema({
    date: { type: String },
    category: { type: String },
    productsSold: { type: Number },
    totalEarnings: { type: Number }
})

const ProductsStatisticsModel = model("productsstatistics", ProductsStatisticsSchema)
export default ProductsStatisticsModel;
