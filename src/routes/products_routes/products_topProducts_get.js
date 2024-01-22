import ProductsController from "../../controllers/products-controllers/ProductsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function products_topProducts_get(req, res) {
        const { sortBy, limit } = req.query;
        const result = await ProductsController.getTopProducts(sortBy, limit);
        res.status(result ? 200 : 400).json(result)
    }
)