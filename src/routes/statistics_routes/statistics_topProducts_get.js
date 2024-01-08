import StatisticsController from "../../controllers/statistics-controllers/StatisticsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function statistics_topProducts_get(req, res) {
        const results = await StatisticsController.topProducts(req.query.limit);
        res.status(results ? 200 : 400).json(results);
    }
)