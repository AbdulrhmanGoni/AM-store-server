import YearlyStatisticsModel from "../../models/YearlyStatistics.js";
import getYearStatisticsDocument from "./getYearStatisticsDocument.js";

export default async function monthlySalesStatistics(year = new Date().getFullYear()) {
    try {
        const data = await YearlyStatisticsModel.findOne({ year: +year }, { _id: 0, monthes: 1, year: 1 });
        if (data) return data
        else {
            const newYearDocument = await getYearStatisticsDocument(year, { createDirectly: true, save: true });
            return newYearDocument.monthes
        }
    } catch (error) {
        console.log(error)
        return;
    }
}