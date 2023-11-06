import { userDataTypes } from "../CONSTANT/projections.js";
import OrdersModule from "../models/Orders.js";


export default async function topCustomers(req, res) {
    try {
        const customers = await OrdersModule.aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalSpending: { $sum: "$totalPrice" },
                    totalOrders: { $count: {} }
                }
            },
            { $sort: { totalSpending: -1, totalOrders: -1 } },
            { $limit: +req.query?.limit ?? 5 },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userData",
                    pipeline: [{ $project: { ...userDataTypes.basic, _id: 0 } }]
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
        res.status(200).json(customers);
    } catch (error) {
        console.log(error)
        res.status(400).json(null);
    }
}
