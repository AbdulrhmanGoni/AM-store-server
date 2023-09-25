import idHandler from "../functions/idHandler.js";
import YearlyStatisticsModel from "../models/YearlyStatistics.js";
import getCurrentDate from "../functions/getCurrentDate.js";


const orders_setStatistics = async (theOrder, session) => {

    const
        { year, month } = getCurrentDate(),
        { products, totalPrice: { after: totalPrice } } = theOrder,
        filter = { year, statisticsType: "monthly-statistics", "monthes.month": month },
        productsCount = products.reduce((acc, curr) => acc + idHandler(curr).count, 0),
        update = {
            $inc: {
                'monthes.$.productsSold': productsCount,
                'monthes.$.totalEarnings': totalPrice,
                'monthes.$.totalOrders': 1
            }
        }

    try {
        const { matchedCount, modifiedCount } = await YearlyStatisticsModel.updateOne(filter, update, { session });
        return (matchedCount && modifiedCount);
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default orders_setStatistics;