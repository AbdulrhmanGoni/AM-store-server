import { productDataTypes } from "../CONSTANT/projections.js";
import createProjection from "../functions/createProjection.js";
import ProductsModule from "../models/Products.js";

const products_pagination = async (req, res) => {
    const { page = 1, pageSize = 10, returnType, type } = req.query;
    const skip = (page - 1) * pageSize;
    const projection = returnType ? createProjection(returnType) : productDataTypes[type ?? "basic"];
    try {
        const products = await ProductsModule.find({}, projection, { limit: +pageSize + 1, skip });
        const thereIsNextPage = !!products[pageSize];
        res.status(200).json(products.slice(0, thereIsNextPage ? -1 : undefined));
    } catch { res.status(400).json([]) }
}

export default products_pagination;