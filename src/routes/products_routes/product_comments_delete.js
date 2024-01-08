import ProductsController from "../../controllers/products-controllers/ProductsController.js"
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";


export default asyncRouteHandler(
    async function product_comments_delete(req, res) {
        const { productId } = req.params;
        const { commentId } = req.body;
        const response = await ProductsController.deleteCommentFromProduct(productId, commentId)
        res.status(response ? 200 : 400).json(response);
    }
)