import ProductsController from '../../controllers/products-controllers/ProductsController.js';
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';
import createProjection from '../../utilities/createProjection.js';

export default asyncRouteHandler(
    async function product_get(req, res) {
        const { returnType } = req.query;
        const projection = returnType ? createProjection(returnType) : {};
        const response = await ProductsController.getProductById(req.params.productId, projection);
        response && res.status(200).json(response);
        response === null && res.status(404).json(null);
        response === false && res.status(400).json(false);
    }
)