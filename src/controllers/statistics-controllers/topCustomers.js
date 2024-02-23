import { userDefaultProjection } from "../../CONSTANT/projections.js";
import OrdersModel from "../../models/Orders.js";


export default async function topCustomers(limit = 5) {
    try {
        const customers = await OrdersModel.aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalSpending: { $sum: "$totalPrice" },
                    totalOrders: { $count: {} }
                }
            },
            { $sort: { totalSpending: -1, totalOrders: -1 } },
            { $limit: +limit },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userData",
                    pipeline: [{ $project: { ...userDefaultProjection, _id: 0 } }]
                }
            },
            {
                $project: {
                    _id: 1,
                    totalSpending: 1,
                    totalOrders: 1,
                    userData: { $first: "$userData" }
                }
            }
        ])
        return customers;
    } catch (error) {
        console.log(error)
        return null;
    }
}
