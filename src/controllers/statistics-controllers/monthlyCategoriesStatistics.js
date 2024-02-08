import YearlyStatisticsModel from "../../models/YearlyStatistics.js";
import getYearStatisticsDocument from "./getYearStatisticsDocument.js";

export default async function monthlyCategoriesStatistics(year = new Date().getFullYear()) {
    try {
        const data = await YearlyStatisticsModel.findOne({ year: +year }, { _id: 0, categories: 1 });
        if (data) return data
        else {
            const { categories } = await getYearStatisticsDocument(year, { createDirectly: true, save: true });
            return { categories }
        }
    } catch (error) {
        console.log(error)
        return;
    }
}