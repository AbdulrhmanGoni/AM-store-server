import AdminController from "../../controllers/admin-controllers/AdminController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function product_post(req, res) {
        const respond = await AdminController.updateProduct(req.params.productId, req.body.changes);
        res.status(200).json(respond);
    }
) 