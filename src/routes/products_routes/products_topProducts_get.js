import ProductsController from "../../controllers/products-controllers/ProductsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function products_topProducts_get(req, res) {
        const { sort, limit } = req.query;
        const result = await ProductsController.getTopProducts(sort, limit);
        res.status(result ? 200 : 400).json(result)
    }
)