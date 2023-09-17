import { Schema, model } from "mongoose";
import { products } from "../system_actions/genVirtualsProperties.js";

const ProductSchema = new Schema({
    title: { type: String },
    price: { type: Number },
    images: { type: Array },
    category: { type: String },
    description: { type: String },
    amount: { type: Number },
    count: { type: Number },
    earnings: { type: Number },
    sold: { type: Number },
    rate: { type: Object },
    series: { type: String },
    comments: { type: Array },
    discount: { type: Object },
},
    {
        timestamps: true,
        virtuals: {
            'rate.avrage': { get: products.rate.avrage }
        }
    }
)

const ProductsModel = model("products", ProductSchema);
export default ProductsModel;