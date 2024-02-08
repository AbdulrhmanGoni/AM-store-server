import { MONTHES } from "../../CONSTANT/MONTHES.js"
import YearlyStatisticsModel from "../../models/YearlyStatistics.js";
import getProductsCategoriesList from "../settings-controllers/getProductsCategoriesList.js";

export default async function getYearStatisticsDocument(year = new Date().getFullYear(), { createDirectly, save } = {}) {

    const yearStatistics = !createDirectly && await YearlyStatisticsModel.findOne({ year });
    if (yearStatistics) return yearStatistics;
    else {
        const productsCategories = await getProductsCategoriesList();
        const newYearStatisticsDocument = new YearlyStatisticsModel({
            year,
            categories: productsCategories.map((category) => {
                return {
                    category,
                    monthlyStatistics: MONTHES.map((month) => {
                        return {
                            month,
                            totalEarnings: 0,
                            productsSold: 0
                        }
                    })
                }
            })
        })

        if (save) {
            await newYearStatisticsDocument.save()
        }

        return newYearStatisticsDocument;
    }
}