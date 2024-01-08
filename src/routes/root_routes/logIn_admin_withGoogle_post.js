import SystemController from "../../controllers/system-controller/SystemController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function logIn_admin_withGoogle_post(req, res) {
        const { googleUserCredentials } = req.body;
        const { status, response } = await SystemController.logInAdminWithGoogle(googleUserCredentials);
        res.status(status).json(response);
    }
)
