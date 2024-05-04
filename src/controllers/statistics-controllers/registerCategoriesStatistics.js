import { MONTHES } from "../../CONSTANT/MONTHES.js";
import { getCurrentDate } from "../../utilities/dateMaker.js";

export default function registerCategoriesStatistics(categories, currentYearStatistics) {
    try {
        const { monthIndex } = getCurrentDate();
        for (const cat in categories) {
            const { productsCount, earnings } = categories[cat]
            const catIndex = currentYearStatistics.categories.findIndex(({ category }) => category === cat)
            if (catIndex === -1) {
                currentYearStatistics.categories.push({
                    category: cat,
                    monthlyStatistics: MONTHES.map((month, index) => {
                        if (index === monthIndex) {
                            return {
                                month,
                                totalEarnings: productsCount,
                                productsSold: earnings
                            }
                        } else {
                            return {
                                month,
                                totalEarnings: 0,
                                productsSold: 0
                            }
                        }
                    })
                })
            } else {
                currentYearStatistics
                    .categories[catIndex]
                    .monthlyStatistics[monthIndex]
                    .productsSold += productsCount

                currentYearStatistics
                    .categories[catIndex]
                    .monthlyStatistics[monthIndex]
                    .totalEarnings += earnings
            }
        }
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}