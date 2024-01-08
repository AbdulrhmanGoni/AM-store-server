import { userDataTypes } from "../../CONSTANT/projections.js";
import UsersController from "../../controllers/users-controllers/UsersController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function user_favorites_get(req, res) {
        const
            id = req.params.userId,
            projections = userDataTypes.userFavorites

        const respond = await UsersController.getFavorites(id, projections);
        res.status(200).json(respond);
    }
)