import OrdersModel from "../../models/Orders.js";


export default async function ordersStatistics(year = new Date().getFullYear()) {
    try {
        const [statistics] = await OrdersModel.aggregate([
            {
                $match: { $expr: { $eq: [{ $year: "$createdAt" }, +year] } }
            },
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
        return statistics
    } catch (error) {
        return []
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