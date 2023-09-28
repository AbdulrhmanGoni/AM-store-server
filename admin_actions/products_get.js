import createProjection from "../functions/createProjection.js";
import { productDataTypes } from "../CONSTANT/dataTypes.js";
import ProductsModule from "../models/Products.js";


async function products_get(req, res) {
    const { type, returnType } = req.query;
    const projection = returnType ? createProjection(returnType) : productDataTypes[type];
    try {
        res.status(200).json(await ProductsModule.findById(req.params.productId, projection))
    }
    catch (err) {
        if (new Error(err).message.match("CastError")) {
            res.status(200).json(false)
        } else res.status(400).json(null);
    }
}

export default products_get;