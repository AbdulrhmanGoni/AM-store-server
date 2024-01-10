import AdminController from "../../controllers/admin-controllers/AdminController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function product_patch(req, res) {
        const { params: { productId }, body: { changes } } = req
        const respond = await AdminController.updateProduct(productId, changes);
        res.status(200).json(respond);
    }
) 