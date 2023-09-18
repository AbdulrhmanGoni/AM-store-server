import { userDataTypes } from "../CONSTANT/dataTypes.js";
import OrdersModule from "../models/Orders.js";
import UserModel from "../models/Users.js";


export default async function orders_topCustomers(req, res) {
    try {
        const customers = await OrdersModule.aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalSpending: { $sum: "$totalPrice.after" },
                    totalOrders: { $count: {} }
                }
            },
            { $sort: { totalSpending: -1 } },
            { $limit: +req.query.limit ?? 5 }
        ])
        for (let i = 0; i < customers.length; i++) {
            const userData = await UserModel.findById(customers[i]._id, { ...userDataTypes.basic, _id: 0 })
            customers[i].userData = userData;
        }
        res.status(200).json(customers);
    } catch (error) {
        console.log(error)
        res.status(400).json(null);
    }
}
