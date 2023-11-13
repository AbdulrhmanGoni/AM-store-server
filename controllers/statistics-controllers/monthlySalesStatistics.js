import YearlyStatisticsModel from "../../models/YearlyStatistics.js";

export default async function monthlySalesStatistics(req, res) {
    const { year = new Date().getFullYear() } = req.query;
    try {
        const data = await YearlyStatisticsModel.findOne({ year: +year }, { _id: 0, monthes: 1, year: 1 });
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(400).json(null);
    }
}