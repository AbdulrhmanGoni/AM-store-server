import StatisticsController from "../../controllers/statistics-controllers/StatisticsController.js";

export default async function statistics_topSerieses_get(req, res) {
    try {
        const results = await StatisticsController.mostPopularSerieses(req.query.limit);
        res.status(results ? 200 : 400).json(results);
    } catch (error) {
        res.status(500).json();
    }
}