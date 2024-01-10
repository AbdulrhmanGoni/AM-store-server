import ProductsController from "../../controllers/products-controllers/ProductsController.js"
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function product_comments_put(req, res) {
        const { params: { productId }, body: { comment } } = req;
        const response = await ProductsController.addCommentToProduct(productId, comment);
        return res.status(response ? 200 : 400).json(response);
    }
)
