import ProductsController from "../../controllers/products-controllers/ProductsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function product_comments_get(req, res) {
        const { productId } = req.params;
        let { sliceNumber, sliceSize } = req.query;
        const options = {
            sliceNumber: +sliceNumber - 1,
            sliceSize: +sliceSize
        }
        const response = await ProductsController.getProductComments(productId, options);
        res.status(response ? 200 : 400).json(response);
    }
)