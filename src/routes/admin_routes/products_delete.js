import AdminController from "../../controllers/admin-controllers/AdminController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";


export default asyncRouteHandler(
    async function products_delete(req, res) {
        const { productsIds = [] } = req.body;
        const respond = await AdminController.deleteProducts([req.params.productId, ...productsIds]);
        res.status(200).json(respond);
    }
)