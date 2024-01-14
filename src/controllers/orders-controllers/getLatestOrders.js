import OrdersModel from "../../models/Orders.js";

export default async function getLatestOrders(limit = 10) {
    try {
        const latestOrders = await OrdersModel.aggregate([
            { $sort: { createdAt: -1 } },
            { $limit: +limit },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                    pipeline: [{ $project: { userEmail: 1, avatar: 1 } }]
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
        return latestOrders;
    } catch (error) {
        console.log(error);
        return [];
    }
}