import SystemController from "../../controllers/system-controller/SystemController.js"
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";


export default asyncRouteHandler(
    async function register_user_post(req, res) {
        const response = await SystemController.registerUser(req.body);
        res.status(response ? 200 : 400).json(response);
    }
)
