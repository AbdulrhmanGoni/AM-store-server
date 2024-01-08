import AdminController from "../../controllers/admin-controllers/AdminController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function products_post(req, res) {
        try {
            const response = await AdminController.addProduct(req.body);
            res.status(response ? 200 : 400).json(response);
        } catch (error) {
            console.log(error)
            res.status(400).json(null);
        }
    }
)