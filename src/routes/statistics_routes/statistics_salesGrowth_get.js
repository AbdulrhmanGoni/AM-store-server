import StatisticsController from "../../controllers/statistics-controllers/StatisticsController.js";

export default async function statistics_salesGrowth_get(_req, res) {
    try {
        const response = await StatisticsController.salesGrowth();
        res.status(response ? 200 : 400).json(response);
    } catch (error) {
        res.status(500).json();
    }
}