import { MONTHES } from "../../CONSTANT/MONTHES.js"
import SettingsModel from "../../models/Settings.js"
import YearlyStatisticsModel from "../../models/YearlyStatistics.js";

export default async function getYearStatisticsDocument(year = new Date().getFullYear()) {

    const yearStatistics = await YearlyStatisticsModel.findOne({ year });
    if (yearStatistics) return yearStatistics;
    else {
        const [{ productsCategories }] = await SettingsModel.find();
        return new YearlyStatisticsModel({
            year,
            categories: productsCategories.map((category) => {
                return {
                    category,
                    monthes: MONTHES.map((month) => {
                        return {
                            month,
                            totalEarnings: 0,
                            productsSold: 0
                        }
                    })
                }
            })
        })
    }
}