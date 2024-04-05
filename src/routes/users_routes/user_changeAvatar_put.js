import changeUserAvatar from "../../controllers/users-controllers/changeUserAvatar.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function user_changeAvatar_put(req, res) {
        const respond = await changeUserAvatar(req.params.userId, req.body.avatarUrl);
        res.status(respond ? 200 : 400).json(respond ?? false);
    }
)