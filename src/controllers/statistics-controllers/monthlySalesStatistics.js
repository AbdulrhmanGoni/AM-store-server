import YearlyStatisticsModel from "../../models/YearlyStatistics.js";
import getYearStatisticsDocument from "./getYearStatisticsDocument.js";

export default async function monthlySalesStatistics(year = new Date().getFullYear()) {
    try {
        const data = await YearlyStatisticsModel.findOne({ year: +year }, { _id: 0, monthes: 1, year: 1 });
        return data ? data : await getYearStatisticsDocument(year, { createDirectly: true, save: true });
    } catch (error) {
        console.log(error)
        return;
    }
}