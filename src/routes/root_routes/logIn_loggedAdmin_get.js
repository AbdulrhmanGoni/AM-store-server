import SystemController from "../../controllers/system-controller/SystemController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function logIn_loggedAdmin_get(req, res) {
        const adminData = await SystemController.loggedAdmin(req.adminId);
        res.status(adminData === undefined ? 400 : 200).json(adminData);
    }
)