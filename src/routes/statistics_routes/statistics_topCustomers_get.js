import StatisticsController from "../../controllers/statistics-controllers/StatisticsController.js";

export default async function statistics_topCustomers_get(req, res) {
    try {
        const results = await StatisticsController.topCustomers(req.query.limit)
        res.status(results ? 200 : 400).json(results);
    } catch (error) {
        res.status(500).json();
    }
}