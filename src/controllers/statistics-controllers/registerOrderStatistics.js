import idParser from "../../utilities/idParser.js";
import { getCurrentDate } from "../../utilities/dateMaker";

export default function registerOrderStatistics({ products, totalPrice }, currentYearStatistics) {
    try {
        const
            { monthIndex } = getCurrentDate(),
            productsCount = products.reduce((acc, curr) => acc + idParser(curr).count, 0)

        currentYearStatistics.monthes[monthIndex].totalOrders++
        currentYearStatistics.monthes[monthIndex].totalEarnings += totalPrice
        currentYearStatistics.monthes[monthIndex].productsSold += productsCount

        return true
    } catch (error) {
        console.log(error)
        return false
    }
}