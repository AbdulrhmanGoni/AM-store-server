import UsersController from "../../controllers/users-controllers/UsersController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function user_locations_post(req, res) {
        const { addLocation, setSelectedLocation } = UsersController;
        const { userId } = req.params;
        const { theLocation, type } = req.body;
        if (type === "newSelected") {
            const respond = await setSelectedLocation(userId, theLocation);
            res.status(respond ? 200 : 400).json(respond);
        } else {
            const respond = await addLocation(userId, theLocation);
            res.status(respond ? 200 : 400).json(respond);
        }
    }
)
