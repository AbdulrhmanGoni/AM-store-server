import moment from "moment";
import idHandler from "../functions/idHandler.js";
import YearlyStatisticsModel from "../models/YearlyStatistics.js";

const orders_setStatistics = async (theOrder) => {
    const
        year = new Date().getFullYear(),
        currentMonth = moment().month(),
        month = moment().month(currentMonth).format("MMM"),
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
        const { matchedCount, modifiedCount } = await YearlyStatisticsModel.updateOne(filter, update);
        return (matchedCount && modifiedCount);
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default orders_setStatistics;


// const orders_setStatistics = async (theOrder) => {
//     const { products } = theOrder;
//     const
//         totalPrice = theOrder.totalPrice.after,
//         productsCount = products.reduce((acc, curr) => acc + idHandler(curr).count, 0)

//     try {
//         const currentDateDoc = await StatisticsHistoryModel.findOneAndUpdate({ date: getCurrentDate() },
//             {
//                 $inc: {
//                     productsSold: productsCount,
//                     totalEarnings: totalPrice,
//                     totalOrders: 1
//                 }
//             }
//         );
//         if (!currentDateDoc) {
//             const newOrder = new StatisticsHistoryModel({
//                 date: getCurrentDate(),
//                 totalEarnings: totalPrice,
//                 totalOrders: 1,
//                 productsSold: productsCount,
//             });
//             await newOrder.save();
//         }
//         return true;
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }

// export default orders_setStatistics;