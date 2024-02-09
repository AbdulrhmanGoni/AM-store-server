import OrdersModel from "../../models/Orders.js";

export default async function ordersStatistics(year = new Date().getFullYear()) {
    try {
        const result = await OrdersModel.aggregate([
            { $match: { $expr: { $eq: [{ $year: "$createdAt" }, +year] } } },
            {
                $group: {
                    _id: "orders",
                    totalOrders: { $count: {} },
                    completedOrders: condition("Completed"),
                    pendingOrders: condition("Pending"),
                    canceledOrders: condition("Canceled")
                }
            }
        ]);

        return result.length ? { year, statistics: result[0] } : {
            year,
            statistics: {
                totalOrders: 0,
                completedOrders: 0,
                pendingOrders: 0,
                canceledOrders: 0
            }
        }
    } catch (error) {
        console.log(error)
        return;
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