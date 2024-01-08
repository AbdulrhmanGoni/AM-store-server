import ProductsController from '../../controllers/products-controllers/ProductsController.js'
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';

export default asyncRouteHandler(
    async function product_get(req, res) {
        const response = await ProductsController.getProductById(req.params.productId, req.query);
        response && res.status(200).json(response);
        response === null && res.status(404).json(null);
        response === false && res.status(400).json(false);
    }
)