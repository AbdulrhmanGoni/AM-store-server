import ProductsController from "../../controllers/products-controllers/ProductsController.js"
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function product_addRatingToProduct_post(req, res) {
        const { productId } = req.params;
        const { userId, rate } = req.body;
        const response = await ProductsController.addRatingToProduct(productId, userId, rate);
        res.status(response ? 200 : 400).json(response);
    }
)