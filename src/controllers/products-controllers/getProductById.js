import ProductsModel from "../../models/Products.js";

export default async function getProductById(productId, projection) {
    try {
        return await ProductsModel.findById(productId, projection);
    }
    catch (err) {
        console.log(err)
        if (err.name == "CastError") return null;
        else return false;
    }
}