import { productDataTypes } from "../CONSTANT/dataTypes.js";
import createProjection from "../functions/createProjection.js";
import ProductsModule from "../models/Products.js";

const products_pagination = async (req, res) => {
    const { page = 1, pageSize = 10, returnType, type } = req.query;
    const skip = (page - 1) * pageSize;
    const projection = returnType ? createProjection(returnType) : productDataTypes[type ?? "basic"];
    try {
        const products = await ProductsModule.find({}, projection, { limit: pageSize, skip });
        res.status(200).json(products);
    } catch {
        res.status(400).json([]);
    }
}

export default products_pagination;