import OrdersModule from "../models/Orders.js";
import UserModel from "../models/Users.js";
import orders_setStatistics from "../system_actions/orders_setStatistics.js";
import products_setStatistics from "../system_actions/products_setStatistics.js";


const orders_addNewOrder = async (req, res) => {
    const { theOrder } = req.body;
    const { products } = theOrder;
    try {
        const { id } = await new OrdersModule(theOrder).save();
        await UserModel.updateOne({ _id: theOrder.userId },
            { $set: { userShoppingCart: [] }, $push: { userOrders: id } }
        );
        await orders_setStatistics(theOrder);
        await products_setStatistics(products);
        res.status(200).json({ ok: true });
    } catch (error) {
        console.log(error);
        res.status(400).json(false);
    }
}

export default orders_addNewOrder;