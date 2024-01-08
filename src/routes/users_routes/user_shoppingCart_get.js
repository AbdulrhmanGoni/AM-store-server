import UsersController from "../../controllers/users-controllers/UsersController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function user_shoppingCart_get(req, res) {
        const products = await UsersController.getShoppingCart(req.userId);
        res.status(200).json(products);
    }
)