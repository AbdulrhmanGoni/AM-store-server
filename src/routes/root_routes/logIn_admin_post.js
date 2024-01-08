import SystemController from "../../controllers/system-controller/SystemController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";


export default asyncRouteHandler(
    async function logIn_admin_post(req, res) {
        const { adminEmail, adminPassword } = req.body;
        const { status, response } = await SystemController.logInAdmin({ adminEmail, adminPassword });
        res.status(status).json(response);
    }
)
