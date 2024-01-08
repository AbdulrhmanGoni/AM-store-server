import SystemController from "../../controllers/system-controller/SystemController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function logIn_user_withGoogle_post(req, res) {
        const { googleUserAccessToken } = req.body;
        const response = await SystemController.logInUserWithGoogle(googleUserAccessToken);
        res.status(response.status).json(response.response);
    }
)
