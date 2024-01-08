import { MONTHES } from "../../CONSTANT/MONTHES.js";
import YearlyStatisticsModel from "../../models/YearlyStatistics.js";

export default async function salesGrowth() {
    try {
        const lastMonth = new Date(new Date().setMonth(-1))
        const beforeLastMonth = new Date(new Date().setMonth(-2))

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
                            else: {},
                        }
                    },
                    beforeLastMonthEarnings: {
                        $cond: {
                            if: { $eq: ["$year", beforeLastMonthYear] },
                            then: { $arrayElemAt: ["$monthes", beforeLastMonthIndex] },
                            else: {},
                        }
                    },
                    _id: false
                }
            },
            {
                $project: {
                    lastMonth: {
                        month: MONTHES[lastMonthIndex],
                        earnings: "$lastMonthEarnings.totalEarnings",
                    },
                    beforeLastMonth: {
                        month: MONTHES[beforeLastMonthIndex],
                        earnings: "$beforeLastMonthEarnings.totalEarnings"
                    }
                }
            }
        ]);

        if (salesGrowthData) {
            const { lastMonth, beforeLastMonth } = salesGrowthData
            lastMonth.year = lastMonthYear
            beforeLastMonth.year = beforeLastMonthYear
            const growthRete = (lastMonth?.earnings - beforeLastMonth?.earnings) / beforeLastMonth?.earnings * 100
            return {
                lastMonth,
                beforeLastMonth,
                growthRete: +(growthRete.toFixed(2))
            }
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return;
    }
}