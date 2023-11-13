import createProjection from "../../functions/createProjection.js";
import { productDataTypes } from "../../CONSTANT/projections.js";
import ProductsModule from "../../models/Products.js";


async function products_get(req, res) {
    const { type, returnType } = req.query;
    const { productId } = req.params;
    const { [type]: dataType } = productDataTypes;
    const projection = returnType ? createProjection(returnType) : dataType;
    try {
        const product = await ProductsModule.findById(productId, projection)
        res.status(200).json(product);
    }
    catch (err) {
        if (err.name == "CastError") res.status(404).json()
        else res.status(400).json()
    }
}

export default products_get;