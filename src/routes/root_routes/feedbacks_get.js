import SystemController from "../../controllers/system-controller/SystemController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function feedbacks_get(req, res) {
        let { sliceNumber, sliceSize } = req.query;
        const options = {
            sliceNumber: +sliceNumber - 1,
            sliceSize: +sliceSize
        }
        const { status, response } = await SystemController.getUsersFeedback(options)
        res.status(status).json(response);
    }
)