import UsersController from '../../controllers/users-controllers/UsersController.js';
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';

export default asyncRouteHandler(
    async function user_clearFavorites_delete(req, res) {
        const response = await UsersController.clearFavorites(req.params.userId);
        res.status(200).json(response);
    }
)