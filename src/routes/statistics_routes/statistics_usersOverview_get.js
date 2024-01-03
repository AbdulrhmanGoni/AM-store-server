import StatisticsController from "../../controllers/statistics-controllers/StatisticsController.js";

export default async function statistics_usersOverview_get(req, res) {
    try {
        const { page, pageSize } = req.query;
        const results = await StatisticsController.usersOverview(page, pageSize);
        res.status(results ? 200 : 400).json(results);
    } catch (error) {
        res.status(500).json();
    }
}
