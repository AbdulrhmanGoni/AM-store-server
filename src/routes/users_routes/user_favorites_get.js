import UsersController from "../../controllers/users-controllers/UsersController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function user_favorites_get(req, res) {
        const
            id = req.userId,
            projections = { userFavorites: 1, _id: 0 }

        const respond = await UsersController.getFavorites(id, projections);
        res.status(200).json(respond);
    }
)