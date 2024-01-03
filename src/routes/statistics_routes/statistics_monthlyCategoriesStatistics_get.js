import StatisticsController from "../../controllers/statistics-controllers/StatisticsController.js";

export default async function statistics_monthlyCategoriesStatistics_get(req, res) {
    try {
        const results = await StatisticsController.monthlyCategoriesStatistics(req.query.year)
        res.status(results ? 200 : 400).json(results);
    } catch (error) {
        res.status(500).json();
    }
}