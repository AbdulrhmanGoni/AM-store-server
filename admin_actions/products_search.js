import createProjection from "../functions/createProjection.js";
import { productDataTypes } from "../CONSTANT/dataTypes.js";
import searchForProducts from "../functions/searchForProducts.js";

async function products_search(req, res) {
    const { type, returnType } = req.query;
    const projection = returnType ? createProjection(returnType) : productDataTypes[type];
    try {
        const products = await searchForProducts({ queries: req.query, projection });
        res.status(200).json(products);
    } catch {
        res.status(400).json(null);
    }
}

export default products_search;