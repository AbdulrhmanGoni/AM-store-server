import UsersController from "../../controllers/users-controllers/UsersController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function user_setShoppingCart_put(req, res) {
        const { setShoppingCart } = UsersController;
        const response = await setShoppingCart(req.userId, req.body.productsIds);
        res.status(response ? 200 : 400).json(response);
    }
)
