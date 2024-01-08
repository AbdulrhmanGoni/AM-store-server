import UsersController from '../../controllers/users-controllers/UsersController.js';
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';

export default asyncRouteHandler(
    async function user_locations_delete(req, res) {
        const { locationId } = req.body;
        const response = await UsersController.deleteLocation(req.params.userId, locationId);
        res.status(200).json(response);
    }
)