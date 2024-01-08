import { productDataTypes } from "../../CONSTANT/projections.js";
import ProductsController from "../../controllers/products-controllers/ProductsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";
import createProjection from "../../utilities/createProjection.js";


export default asyncRouteHandler(
    async function products_search_get(req, res) {
        const { type, returnType } = req.query;
        const projection = returnType ? createProjection(returnType) : productDataTypes[type];
        try {
            const products = await ProductsController.search({ queries: req.query, projection });
            res.status(200).json(products);
        } catch {
            res.status(400).json(null);
        }
    }
)