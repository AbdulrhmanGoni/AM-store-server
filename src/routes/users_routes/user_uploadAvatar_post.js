import uploadNewAvatar from "../../controllers/users-controllers/uploadNewAvatar.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function user_uploadAvatar_post(req, res) {
        const respond = await uploadNewAvatar(req.params.userId, req.body.avatarUrl);
        res.status(respond ? 200 : 400).json(respond ?? false);
    }
)