import YearlyStatisticsModel from "../models/YearlyStatistics.js";

async function monthly_statistics(req, res) {
    const { targetYear = new Date().getFullYear() } = req.query;
    const filter = { year: targetYear, statisticsType: "monthly-statistics" };
    const projection = { _id: false, statisticsType: false, year: false };
    try {
        const statistics = await YearlyStatisticsModel.findOne(filter, projection);
        res.status(200).json(statistics.monthes);
    } catch (error) {
        console.log(error)
        res.status(400).json(null);
    }
}

export default monthly_statistics;
