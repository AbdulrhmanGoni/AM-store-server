import YearlyStatisticsModel from "../models/YearlyStatistics.js";

export default async function monthlyCategoriesStatistics(req, res) {
    const { targetYear: year = new Date().getFullYear() } = req.query;
    try {
        const { categories } = await YearlyStatisticsModel.findOne({ year }, { _id: 0, categories: 1 });
        res.status(200).json(categories);
    } catch (error) {
        console.log(error.message ?? error)
        res.status(400).json(null);
    }
}