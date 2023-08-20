import { userDataTypes } from "../CONSTANT/dataTypes.js";
import OrdersModule from "../models/Orders.js";
import UserModel from "../models/Users.js";

const orders_cancel = async (req, res) => {
    try {
        const { orderId, type } = req.body;
        const { userId } = req.params;
        if (type === "cancel") {
            const { modifiedCount, matchedCount } = await OrdersModule.updateOne(
                { _id: orderId, userId },
                { $set: { state: "canceled", deliveryDate: "canceled" } }
            );
            if (modifiedCount && matchedCount) res.status(200).json(true);
            else res.status(400).json(false);
        } else return res.status(400).json(false);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default orders_cancel;