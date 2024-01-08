import SystemController from "../../controllers/system-controller/SystemController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";


export default asyncRouteHandler(
    async function register_user_withGoogle_post(req, res) {
        const { googleUserAccessToken } = req.body;
        const response = await SystemController.registerUserWithGoogle(googleUserAccessToken);
        res.status(response ? 200 : 400).json(response);
    }
)
