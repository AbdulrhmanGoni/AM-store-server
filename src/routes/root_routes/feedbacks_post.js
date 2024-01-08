import SystemController from "../../controllers/system-controller/SystemController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function feedbacks_post(req, res) {
        const { status, response } = await SystemController.addFeedback(req.body)
        res.status(status).json(response);
    }
)