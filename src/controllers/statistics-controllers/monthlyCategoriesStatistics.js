import YearlyStatisticsModel from "../../models/YearlyStatistics.js";

export default async function monthlyCategoriesStatistics(year = new Date().getFullYear()) {
    try {
        const data = await YearlyStatisticsModel.findOne({ year: +year }, { _id: 0, categories: 1, year: 1 });
        return data
    } catch (error) {
        console.log(error.message ?? error)
        return null;
    }
}