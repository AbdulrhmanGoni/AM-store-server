import ProductsController from "../../controllers/products-controllers/ProductsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function product_areUserBoughtAProductsBefore_get(req, res) {
        const { productId } = req.params;
        const response = await ProductsController.areUserBoughtAProductsBefore(productId, req.userId);
        res.status(200).json(response);
    }
)