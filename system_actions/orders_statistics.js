import getCurrentDate from "../functions/getCurrentDate.js";
import OrdersModel from "../models/Orders.js";


export default async function orders_statistics(_, res) {
    try {
        const { year } = getCurrentDate()
        const [statistics] = await OrdersModel.aggregate([
            {
                $group: {
                    _id: "orders",
                    ordersCount: { $count: {} },
                    currentYearOrders: {
                        $sum: {
                            $cond: {
                                if: { $eq: [{ $year: "$createdAt" }, year] },
                                then: 1,
                                else: 0,
                            }
                        }
                    },
                    completedOrders: condition("Completed"),
                    pendingOrders: condition("Pending"),
                    canceledOrders: condition("Canceled")
                }
            }
        ]);
        res.status(200).json(statistics);
    } catch (error) {
        console.log(error);
        res.status(400).json([]);
    }
}

const condition = (state) => {
    return {
        $sum: {
            $cond: {
                if: { $eq: ["$state", state] },
                then: 1,
                else: 0,
            }
        }
    }
}