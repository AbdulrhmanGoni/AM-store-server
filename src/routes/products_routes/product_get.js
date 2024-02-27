import { productDataTypes } from '../../CONSTANT/projections.js';
import ProductsController from '../../controllers/products-controllers/ProductsController.js';
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';

export default asyncRouteHandler(
    async function product_get(req, res) {
        const projection = productDataTypes[req.query.type] || productDataTypes.basic
        const response = await ProductsController.getProductById(req.params.productId, projection);
        response && res.status(200).json(response);
        response === null && res.status(404).json(null);
        response === false && res.status(400).json(false);
    }
)