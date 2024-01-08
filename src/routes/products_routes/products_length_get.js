import ProductsController from '../../controllers/products-controllers/ProductsController.js'
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';

export default asyncRouteHandler(
    async function products_length_get(_, res) {
        const length = await ProductsController.productsCount();
        res.status(length ? 200 : 400).json(length);
    }
)