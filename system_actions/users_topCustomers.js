import UserModel from "../models/Users.js";

export default async function users_topCustomers(req, res) {
    try {
        const users = await UserModel.aggregate([
            {
                $project: {
                    userName: "$userName",
                    email: "$userEmail",
                    orders: { $size: "$userOrders" }
                }
            },
            { $limit: +req.query.limit },
            { $sort: { orders: -1 } }
        ])
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        res.status(400).json(null)
    }
}