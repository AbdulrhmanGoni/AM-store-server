import YearlyStatisticsModel from "../../models/YearlyStatistics.js";
import getYearStatisticsDocument from "./getYearStatisticsDocument.js";

export default async function monthlySalesStatistics(year = new Date().getFullYear()) {
    try {
        const data = await YearlyStatisticsModel.findOne({ year: +year }, { _id: 0, monthes: 1 });
        if (data) return data
        else {
            const { monthes } = await getYearStatisticsDocument(year, { createDirectly: true, save: true });
            return { monthes }
        }
    } catch (error) {
        console.log(error)
        return;
    }
}