import { userDataTypes } from "../../CONSTANT/projections.js";
import OrdersModel from "../../models/Orders.js";

async function orders_getLatest(req, res) {
    try {
        const latestOrders = await OrdersModel.aggregate([
            { $sort: { createdAt: -1 } },
            { $limit: +req.query.limit ?? 5 },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                    pipeline: [{ $project: userDataTypes.basic }]
                }
            },
            {
                $project: {
                    totalPrice: "$totalPrice",
                    products: "$products",
                    state: "$state",
                    expectedDeliveryDate: "$expectedDeliveryDate",
                    deliveryPrice: "$deliveryPrice",
                    createdAt: "$createdAt",
                    userData: { $arrayElemAt: ["$user", 0] }
                }
            }
        ]);
        res.status(200).json(latestOrders);
    } catch (error) {
        console.log(error);
        res.status(400).json([]);
    }
}

export default orders_getLatest