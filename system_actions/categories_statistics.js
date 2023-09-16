import YearlyStatisticsModel from "../models/YearlyStatistics.js";

export default async function getCategoriesStatistics(req, res) {
    const { targetYear = new Date().getFullYear() } = req.query;
    const filter = { year: targetYear, statisticsType: "products-categories" };
    const projection = { _id: false, statisticsType: false, year: false };
    try {
        const statistics = await YearlyStatisticsModel.findOne(filter, projection);
        res.status(200).json(statistics.categories);
    } catch (error) {
        console.log(error)
        res.status(400).json(null);
    }
}