import UsersController from "../../controllers/users-controllers/UsersController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function user_favorites_put(req, res) {
        const { userId } = req.params;
        const { favorites } = req.body;
        const response = await UsersController.setFavorites(userId, favorites);
        res.status(200).json(response);
    }
)