import ProductsModule from "../models/Products.js";
import { productDataTypes } from "../CONSTANT/projections.js";
import createProjection from "../functions/createProjection.js";

const products_getById = async (req, res) => {
    const { productId } = req.params;
    const { type, returnType } = req.query;
    const projection = returnType ? createProjection(returnType) : productDataTypes[type ?? "basic"]
    try { res.status(200).json(await ProductsModule.findById(productId, projection)) }
    catch (err) {
        switch (err.name) {
            case "CastError":
                res.status(500).json(false)
                break;

            default:
                res.status(400).json(null)
                break;
        }
    }
}

export default products_getById;