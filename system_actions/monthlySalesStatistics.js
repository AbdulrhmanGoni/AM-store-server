import YearlyStatisticsModel from "../models/YearlyStatistics.js";

export default async function monthlySalesStatistics(req, res) {
    const { targetYear: year = new Date().getFullYear() } = req.query;
    try {
        const { monthes } = await YearlyStatisticsModel.findOne({ year }, { _id: 0, monthes: 1 });
        res.status(200).json(monthes);
    } catch (error) {
        console.log(error)
        res.status(400).json(null);
    }
}