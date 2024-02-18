import { productDataTypes } from "../../CONSTANT/projections.js";
import ProductsController from "../../controllers/products-controllers/ProductsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";


export default asyncRouteHandler(
    async function products_userSearch_get(req, res) {
        const result = await ProductsController.search({
            queries: req.query,
            projection: productDataTypes[req.query.type ?? "basic"]
        });
        if (result) {
            res.status(200).json(result);
        } else res.status(400).json();
    }
)