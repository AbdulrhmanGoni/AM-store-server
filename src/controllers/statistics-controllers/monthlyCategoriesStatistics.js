import YearlyStatisticsModel from "../../models/YearlyStatistics.js";
import getYearStatisticsDocument from "./getYearStatisticsDocument.js";

export default async function monthlyCategoriesStatistics(year = new Date().getFullYear()) {
    try {
        const data = await YearlyStatisticsModel.findOne({ year: +year }, { _id: 0, categories: 1, year: 1 });
        if (data) return data
        else {
            const newYearDocument = await getYearStatisticsDocument(year, { createDirectly: true, save: true });
            return newYearDocument.categories
        }
    } catch (error) {
        console.log(error)
        return;
    }
}