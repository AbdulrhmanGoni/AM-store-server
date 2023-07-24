import { productDataTypes } from "../CONSTANT/dataTypes.js";
import ProductsModule from "../models/Products.js";
async function rating_get(req, res) {
    try {
        const { productId } = req.params;
        const product = await ProductsModule.findById(productId, productDataTypes.rating);
        res.status(200).json(product.toJSON().rate);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default rating_get;