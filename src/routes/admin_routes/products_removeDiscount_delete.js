import AdminController from "../../controllers/admin-controllers/AdminController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function products_removeDiscount_delete(req, res) {
        try {
            const { productsIds } = req.body;
            const response = await AdminController.removeDiscountFromProducts(productsIds);
            res.status(response ? 200 : 400).json(response);
        } catch (error) {
            console.log(error)
            res.status(400).json(null);
        }
    }
)