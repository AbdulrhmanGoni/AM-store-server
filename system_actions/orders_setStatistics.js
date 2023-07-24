import getCurrentDate from "../functions/getCurrentDate.js";
import idHandler from "../functions/idHandler.js";
import StatisticsHistoryModel from "../models/StatisticsHistory.js";

const orders_setStatistics = async (theOrder) => {
    const { products } = theOrder;
    const
        totalPrice = theOrder.totalPrice.after,
        productsCount = products.reduce((acc, curr) => acc + idHandler(curr).count, 0)

    try {
        const currentDateDoc = await StatisticsHistoryModel.findOneAndUpdate({ date: getCurrentDate() },
            {
                $inc: {
                    productsSold: productsCount,
                    totalEarnings: totalPrice,
                    totalOrders: 1
                }
            }
        );
        if (!currentDateDoc) {
            const newOrder = new StatisticsHistoryModel({
                date: getCurrentDate(),
                totalEarnings: totalPrice,
                totalOrders: 1,
                productsSold: productsCount,
            });
            await newOrder.save();
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default orders_setStatistics;