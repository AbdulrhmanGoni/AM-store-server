import { Schema, model } from "mongoose";
import { products } from "../system_actions/genVirtualsProperties.js";
import { DiscoutCobone } from "./StoreVariables.js";

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLingth: 6
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLingth: 12
    },
    amount: {
        type: Number,
        required: true
    },
    count: Number,
    earnings: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    rate: { type: Object },
    discount: DiscoutCobone,
    comments: { type: Array },
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