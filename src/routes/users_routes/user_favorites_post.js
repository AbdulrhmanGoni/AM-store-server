import UsersController from "../../controllers/users-controllers/UsersController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function user_favorites_post(req, res) {
        const { toggleFavorites, setFavorites } = UsersController
        const { userId } = req.params;
        const { type, productId, favorites } = req.body;
        switch (type) {
            case "toggle": {
                const response = await toggleFavorites(userId, productId);
                res.status(200).json(response);
                break;
            }

            case "setNewFavorites": {
                const response = await setFavorites(userId, favorites);
                res.status(200).json(response);
                break;
            }
            default:
                res.status(400).json(null);
                break;
        }
    }
)