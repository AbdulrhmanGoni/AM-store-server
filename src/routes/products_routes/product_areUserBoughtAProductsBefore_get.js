import ProductsController from "../../controllers/products-controllers/ProductsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";
import extractAuthFromRequestHeaders from "../../utilities/extractAuthFromRequestHeaders.js";
import { verifyJWT } from "../../utilities/jwtUtilities.js";

export default asyncRouteHandler(
    async function product_areUserBoughtAProductsBefore_get(req, res) {
        const { accessToken } = extractAuthFromRequestHeaders(req)
        if (accessToken) {
            try {
                const userId = (verifyJWT(accessToken)).userId
                if (userId) {
                    const { productId } = req.params;
                    const response = await ProductsController.areUserBoughtAProductsBefore(productId, userId);
                    return res.status(200).json(response);
                }
            } catch { }
        }
        res.status(200).json(false);
    }
)