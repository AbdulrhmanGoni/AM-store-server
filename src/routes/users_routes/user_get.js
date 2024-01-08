import { userDataTypes } from "../../CONSTANT/projections.js";
import UsersController from "../../controllers/users-controllers/UsersController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function user_get(req, res) {
        const
            id = req.params.userId,
            projection = userDataTypes[req.query.type ?? "basic"]

        const userData = UsersController.getUserData(id, projection);
        res.status(200).json(userData);
    }
)