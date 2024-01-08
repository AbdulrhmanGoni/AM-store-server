import ProductsController from "../../controllers/products-controllers/ProductsController.js"
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function product_getProductRating_get(req, res) {
        const { productId } = req.params;
        const { userId } = req.query;
        const response = await ProductsController.getProductRating(productId, userId);
        res.status(response === null ? 400 : 200).json(response);
    }
)