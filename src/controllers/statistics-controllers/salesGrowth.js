import { MONTHES } from "../../CONSTANT/MONTHES.js";
import YearlyStatisticsModel from "../../models/YearlyStatistics.js";

export default async function salesGrowth() {
    try {
        const currentMonthIndex = new Date().getMonth();

        const lastMonth = new Date(new Date().setMonth(currentMonthIndex - 1));
        const beforeLastMonth = new Date(new Date().setMonth(currentMonthIndex - 2));

        const lastMonthYear = lastMonth.getFullYear();
        const beforeLastMonthYear = beforeLastMonth.getFullYear();

        const lastMonthIndex = lastMonth.getMonth();
        const beforeLastMonthIndex = beforeLastMonth.getMonth();

        const [salesGrowthData] = await YearlyStatisticsModel.aggregate([
            { $match: { $or: [{ year: lastMonthYear }, { year: beforeLastMonthYear }] } },
            { $project: { monthes: 1, year: 1 } },
            {
                $project: {
                    lastMonthEarnings: {
                        $cond: {
                            if: { $eq: ["$year", lastMonthYear] },
                            then: { $arrayElemAt: ["$monthes", lastMonthIndex] },
                            else: {}
                        }
                    },
                    beforeLastMonthEarnings: {
                        $cond: {
                            if: { $eq: ["$year", beforeLastMonthYear] },
                            then: { $arrayElemAt: ["$monthes", beforeLastMonthIndex] },
                            else: {}
                        }
                    },
                    _id: false
                }
            },
            {
                $group: {
                    _id: "monthes earnings",
                    lastMonthEarnings: { $sum: "$lastMonthEarnings.totalEarnings" },
                    beforeLastMonthEarnings: { $sum: "$beforeLastMonthEarnings.totalEarnings" }
                }
            }
        ]);

        if (salesGrowthData) {
            const { lastMonthEarnings, beforeLastMonthEarnings } = salesGrowthData
            const growthRate = (lastMonthEarnings - beforeLastMonthEarnings) / beforeLastMonthEarnings * 100
            return {
                lastMonth: {
                    year: lastMonthYear,
                    month: MONTHES[lastMonthIndex],
                    earnings: lastMonthEarnings
                },
                beforeLastMonth: {
                    year: beforeLastMonthYear,
                    month: MONTHES[beforeLastMonthIndex],
                    earnings: beforeLastMonthEarnings
                },
                growthRate: +(growthRate.toFixed(2))
            }
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return;
    }
}