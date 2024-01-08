import UsersController from "../../controllers/users-controllers/UsersController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function user_count_get(_, res) {
        res.status(200).json(await UsersController.usersCount());
    }
)