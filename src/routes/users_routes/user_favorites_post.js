import UsersController from "../../controllers/users-controllers/UsersController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function user_favorites_post(req, res) {
        const { userId } = req.params;
        const { productId } = req.body;
        const response = await UsersController.toggleFavorites(userId, productId);
        res.status(200).json(response);
    }
)
