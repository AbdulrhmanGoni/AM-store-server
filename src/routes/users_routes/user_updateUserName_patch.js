import UsersController from '../../controllers/users-controllers/UsersController.js';
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';

export default asyncRouteHandler(
    async function user_updateUserName_patch(req, res) {
        const respond = await UsersController.updateUserName(req.userId, req.body.newName);
        res.status(respond ? 200 : 400).json(respond);
    }
)