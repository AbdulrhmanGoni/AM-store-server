import idHandler from "../functions/idHandler.js";
import YearlyStatisticsModel from "../models/YearlyStatistics.js";
import getCurrentDate from "../functions/getCurrentDate.js";


const orders_setStatistics = async (theOrder, session) => {

    const statisticsType = "monthly-statistics"
    const
        { year, month } = getCurrentDate(),
        { products, totalPrice } = theOrder,
        filter = { year, statisticsType, "monthes.month": month },
        productsCount = products.reduce((acc, curr) => acc + idHandler(curr).count, 0),
        update = {
            $inc: {
                'monthes.$.productsSold': productsCount,
                'monthes.$.totalEarnings': totalPrice,
                'monthes.$.totalOrders': 1
            }
        }

    try {
        const {
            acknowledged,
            matchedCount,
            modifiedCount
        } = await YearlyStatisticsModel.updateOne(filter, update, { session });

        if (acknowledged && !matchedCount && !modifiedCount) {
            const nweYearStatistics = new YearlyStatisticsModel({ year, statisticsType })
            nweYearStatistics.monthes.forEach((m) => {
                if (m.month === month) {
                    m.productsSold += productsCount
                    m.totalEarnings += totalPrice
                    m.totalOrders += 1
                }
            })
            await nweYearStatistics.save({ session })
        }
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export default orders_setStatistics;