import StatisticsController from "../../controllers/statistics-controllers/StatisticsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function statistics_salesGrowth_get(_req, res) {
        const response = await StatisticsController.salesGrowth();
        res.status(response !== undefined ? 200 : 400).json(response);
    }
)