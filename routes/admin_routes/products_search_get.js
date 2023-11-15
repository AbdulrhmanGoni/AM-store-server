import { productDataTypes } from "../../CONSTANT/projections";
import ProductsController from "../../controllers/products-controllers/ProductsController";
import createProjection from "../../functions/createProjection";


export default async function products_search_get(req, res) {
    const { type, returnType } = req.query;
    const projection = returnType ? createProjection(returnType) : productDataTypes[type];
    try {
        const products = await ProductsController.search({ queries: req.query, projection });
        res.status(200).json(products);
    } catch {
        res.status(400).json(null);
    }
}
