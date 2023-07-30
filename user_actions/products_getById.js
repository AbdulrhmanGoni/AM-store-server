import ProductsModule from "../models/Products.js";
import { productDataTypes } from "../CONSTANT/dataTypes.js";

const products_getById = async (req, res) => {
    const { productId } = req.params;
    const { type } = req.query;
    try { res.status(200).json(await ProductsModule.findById(productId, productDataTypes[type ?? "basic"]) ?? false) }
    catch (err) {
        switch (err.name) {
            case "CastError":
                res.status(500).json(false)
                break;

            default:
                res.status(500).json(null)
                break;
        }
    }
}

export default products_getById;