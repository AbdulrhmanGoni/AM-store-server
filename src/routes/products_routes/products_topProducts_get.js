import cacheOrQuery from "../../cache/cacheOrQuery.js";
import ProductsController from "../../controllers/products-controllers/ProductsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

const CACHE_EXPIRATION_DATE = 60 * 60 // seconds * minutes

export default asyncRouteHandler(
    async function products_topProducts_get(req, res) {
        const { limit } = req.query;
        const key = `top-products-${limit}`
        const response = await cacheOrQuery(key, ProductsController.getTopProducts(limit), CACHE_EXPIRATION_DATE)
        res.status(response ? 200 : 400).json(response)
    }
)