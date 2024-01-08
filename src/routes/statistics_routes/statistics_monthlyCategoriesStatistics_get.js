import StatisticsController from "../../controllers/statistics-controllers/StatisticsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function statistics_monthlyCategoriesStatistics_get(req, res) {
        const results = await StatisticsController.monthlyCategoriesStatistics(req.query.year)
        res.status(results ? 200 : 400).json(results);
    }
)