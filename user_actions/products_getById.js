import ProductsModule from "../models/Products.js";
import { productDataTypes } from "../CONSTANT/dataTypes.js";

const products_getById = async (req, res) => {
    const { productId } = req.params;
    const { type } = req.query;
    try { res.status(200).json(await ProductsModule.findById(productId, productDataTypes[type ?? "basic"])) }
    catch { res.status(404).json(null) }
}

export default products_getById;