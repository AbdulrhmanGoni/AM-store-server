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
        const ordersDone = await orders_setStatistics(theOrder);
        const productsDone = await products_setStatistics(products);
        if (ordersDone && productsDone) res.status(200).json({ ok: true });
        else res.status(200).json({ ok: false });
    } catch (error) {
        console.log(error);
        res.status(400).json(false);
    }
}

export default orders_addNewOrder;