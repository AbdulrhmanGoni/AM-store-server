import { productDataTypes } from "../../CONSTANT/projections.js";
import ProductsController from "../../controllers/products-controllers/ProductsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";


export default asyncRouteHandler(
    async function products_userSearch_get(req, res) {
        const products = await ProductsController.search({
            queries: req.query,
            projection: productDataTypes[req.query.type ?? "basic"]
        });
        if (products) {
            if (products.length) res.status(200).json(products);
            else res.status(404).json([]);
        } else res.status(400).json();
    }
)