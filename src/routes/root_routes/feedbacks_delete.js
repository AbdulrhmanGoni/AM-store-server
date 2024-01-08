import SystemController from "../../controllers/system-controller/SystemController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function feedbacks_delete(req, res) {
        const { feedbackId } = req.query;
        const response = await SystemController.deleteFeedback(feedbackId)
        res.status(response ? 200 : 400).json();
    }
)