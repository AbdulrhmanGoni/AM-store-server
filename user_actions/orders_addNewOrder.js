import mongoose from "mongoose";
import OrdersModule from "../models/Orders.js";
import UserModel from "../models/Users.js";
import orders_setStatistics from "../system_actions/orders_setStatistics.js";
import products_setStatistics from "../system_actions/products_setStatistics.js";


const orders_addNewOrder = async (req, res) => {
    const { theOrder } = req.body;
    const { products } = theOrder;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { id } = await new OrdersModule(theOrder).save({ session })
        await UserModel.updateOne(
            { _id: theOrder.userId },
            { $set: { userShoppingCart: [] }, $push: { userOrders: id } },
            { session }
        );

        const ordersDone = await orders_setStatistics(theOrder, session);
        const productsDone = await products_setStatistics(products, session);

        if (ordersDone && productsDone) {
            await session.commitTransaction();
            res.status(200).json({ ok: true });
        }
        else {
            res.status(200).json({ ok: false });
            await session.abortTransaction();
        }
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        res.status(400).json(false);
    } finally {
        await session.endSession();
    }
}

export default orders_addNewOrder;