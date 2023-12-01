import ProductsModel from "../../models/Products.js";
import { productDataTypes } from "../../CONSTANT/projections.js";
import createProjection from "../../utilities/createProjection.js";

export default async function getProductById(productId, query) {
    const { type, returnType } = query;
    const { [type]: dataType } = productDataTypes;
    const projection = returnType ? createProjection(returnType) : dataType;
    try {
        return await ProductsModel.findById(productId, projection);
    }
    catch (err) {
        console.log(err)
        if (err.name == "CastError") return null;
        else return false;
    }
}