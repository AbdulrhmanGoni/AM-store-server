import { userDataTypes } from "../CONSTANT/dataTypes.js";
import OrdersModel from "../models/Orders.js";
import UsersModel from "../models/Users.js";

async function orders_getLatest(req, res) {
    try {
        const latestOrders = await OrdersModel.find(
            {}, {}, { sort: { "createdAt": -1 }, limit: req.query.limit }
        );
        for (let i = 0; i !== latestOrders.length; i++) {
            const userData = await UsersModel.findById(latestOrders[i].userId, userDataTypes.basic);
            latestOrders[i].userData = userData;
        }
        res.status(200).json(latestOrders);
    } catch (error) {
        console.log(error);
        res.status(400).json([]);
    }
}

export default orders_getLatest