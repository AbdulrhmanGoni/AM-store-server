import OrdersModel from "../models/Orders.js";


export default async function orders_statistics(req, res) {
    try {
        const { year = new Date().getFullYear() } = req.query
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