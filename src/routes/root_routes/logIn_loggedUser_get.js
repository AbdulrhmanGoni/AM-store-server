import SystemController from '../../controllers/system-controller/SystemController.js'
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';

export default asyncRouteHandler(
    async function logIn_loggedUser_get(req, res) {
        const response = await SystemController.loggedUser(req.userId)
        response && res.status(200).json(response);
        !response && res.status(400).json()
    }
)
