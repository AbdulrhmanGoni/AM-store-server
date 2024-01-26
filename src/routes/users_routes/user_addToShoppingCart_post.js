import UsersController from "../../controllers/users-controllers/UsersController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function user_shoppingCart_post(req, res) {
        const { addToShoppingCart } = UsersController;
        const { productId, count } = req.body
        if (productId && count) {
            const response = await addToShoppingCart(req.userId, req.body);
            res.status(response ? 200 : 400).json(response);
        } else {
            res.status(400).json();
        }
    }
)
