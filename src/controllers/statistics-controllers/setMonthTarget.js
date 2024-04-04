import YearlyStatisticsModel from "../../models/YearlyStatistics.js";

export default async function setMonthTarget({ year, monthIndex, newTarget }) {
    try {
        const respond = await YearlyStatisticsModel.updateOne(
            { year },
            { [`monthes.${monthIndex}.earningsTarget`]: newTarget }
        )
        return !!respond.modifiedCount
    } catch (error) {
        console.log(error)
        return;
    }
}