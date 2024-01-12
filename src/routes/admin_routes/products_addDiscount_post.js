import AdminController from "../../controllers/admin-controllers/AdminController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function products_addDiscount_post(req, res) {
        const { productsIds, discount } = req.body;
        const response = await AdminController.addDiscountToProducts(productsIds, discount);
        res.status(response ? 200 : 400).json(response);
    }
)
