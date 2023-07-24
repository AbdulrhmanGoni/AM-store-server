import { userDataTypes } from "../CONSTANT/dataTypes.js";
import UserModel from "../models/Users.js";

const orders_cancel = async (req, res) => {
    try {
        const filter = { _id: req.params.userId };
        const { orderId, type } = req.body;
        if (type === "cancel") {
            const { userOrders } = await UserModel.findOne(filter, userDataTypes.userOrders);
            userOrders = userOrders.map((order) => {
                if (order.id === orderId) {
                    order.state = "Canceled"
                    order.deliveryDate = "Canceled"
                    return order;
                } else return order
            });
            await UserModel.updateOne(filter, { $set: { userOrders } })
            res.status(200).json(true);
        } else return res.status(400).json(false);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default orders_cancel;