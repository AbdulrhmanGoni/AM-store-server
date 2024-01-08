import SystemController from "../../controllers/system-controller/SystemController.js"
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function notifications_post(req, res) {
        const { body: { notificationsIds }, adminId } = req;
        const response = await SystemController.setNotificationsAsRead(notificationsIds, adminId);
        res.status(response ? 200 : 400).json(response);
    }
)