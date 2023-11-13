import getCurrentDate from "../../functions/getCurrentDate.js";

export default function products_setCategoriesStatistics(categories, currentYearStatistics) {
    try {
        const { monthIndex } = getCurrentDate();
        for (const cat in categories) {
            if (categories[cat]) {
                const { productsCount, earnings } = categories[cat]
                const catIndex = currentYearStatistics.categories.findIndex(({ category }) => category === cat)
                currentYearStatistics.categories[catIndex].monthlyStatistics[monthIndex].productsSold += productsCount
                currentYearStatistics.categories[catIndex].monthlyStatistics[monthIndex].totalEarnings += earnings
            }
        }
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}