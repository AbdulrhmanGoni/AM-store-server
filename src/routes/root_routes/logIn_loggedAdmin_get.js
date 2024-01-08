import SystemController from "../../controllers/system-controller/SystemController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function logIn_loggedAdmin_get(req, res) {
        const adminData = await SystemController.loggedAdmin(req.adminId);
        adminData && res.status(200).json(adminData);
        !adminData && res.status(400).json();
    }
)