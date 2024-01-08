import StatisticsController from "../../controllers/statistics-controllers/StatisticsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function statistics_usersOverview_get(req, res) {
        const { page, pageSize } = req.query;
        const results = await StatisticsController.usersOverview(page, pageSize);
        res.status(results ? 200 : 400).json(results);
    }
)
