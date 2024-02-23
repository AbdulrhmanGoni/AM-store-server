import ProductsModel from "../../models/Products.js";
import { productDataTypes } from "../../CONSTANT/projections.js";

export default async function getProductById(productId, query) {
    const { type } = query;
    try {
        return await ProductsModel.findById(productId, productDataTypes[type || "basic"]);
    }
    catch (err) {
        console.log(err)
        if (err.name == "CastError") return null;
        else return false;
    }
}