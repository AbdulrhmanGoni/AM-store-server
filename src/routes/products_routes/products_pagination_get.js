import ProductsController from '../../controllers/products-controllers/ProductsController.js'
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';

export default asyncRouteHandler(
    async function products_pagination_get(req, res) {
        const products = await ProductsController.productsPagination(req.query);
        res.status(products ? 200 : 400).json(products);
    }
)