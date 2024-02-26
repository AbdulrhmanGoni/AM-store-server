import UsersController from '../../controllers/users-controllers/UsersController.js';
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';

export default asyncRouteHandler(
    async function user_shoppingCart_delete(req, res) {

        const { clearShoppingCart, removeFromShoppingCart } = UsersController;

        if (req.query.clear === "true") {
            const respons = await clearShoppingCart(req.userId);
            res.status(200).json(respons);
        } else {
            const respons = await removeFromShoppingCart(req.userId, req.body.productId);
            res.status(200).json(respons);
        }
    }
)