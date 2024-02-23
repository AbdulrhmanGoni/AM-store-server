import { productDataTypes } from "../../CONSTANT/projections.js";
import ProductsController from "../../controllers/products-controllers/ProductsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function products_searchByIds(req, res) {
        const { productsIds, withCount, withPrice } = req.body;
        const { type } = req.query;
        const projection = productDataTypes[type ?? "basic"];
        const response = await ProductsController.searchByIds(productsIds, projection, { withCount, withPrice });
        res.status(200).json(response);
    }
)