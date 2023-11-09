import mongoose from "mongoose";
import OrdersModule from "../models/Orders.js";
import UserModel from "../models/Users.js";
import orders_setStatistics from "../system_actions/orders_setStatistics.js";
import products_setStatistics from "../system_actions/products_setStatistics.js";
import getYearStatisticsDocument from "../system_actions/getYearStatisticsDocument.js";
import { userDataTypes } from "../CONSTANT/projections.js";
import sendOrderCreatedSuccessfully from "../functions/sendOrderCreatedSuccessfully.js";


export default async function orders_addNewOrder(req, res) {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { theOrder } = req.body;
        const { products, totalPrice } = theOrder;

        const { id } = await new OrdersModule(theOrder).save({ session })
        const userData = await UserModel.findOneAndUpdate(
            { _id: theOrder.userId },
            { $set: { userShoppingCart: [] }, $push: { userOrders: id } },
            { session, projection: userDataTypes.basic }
        );

        // Bring the document that contains the statistics of current year
        const currentYearStatistics = await getYearStatisticsDocument();

        // Add order's total price to the total earnings of current month.
        // And Sum order's products count with the total of the sold products in current month.
        const addingOrderStatisticsDone = orders_setStatistics({ products, totalPrice }, currentYearStatistics);

        /*
            Update order's products: 
            - decrementing product's quantity in stock.
            - incrementing how many times the product sold. 
            ect...
        */
        const addingProductsStatisticsDone = await products_setStatistics(products, currentYearStatistics, session);

        if (addingOrderStatisticsDone && addingProductsStatisticsDone) {
            await currentYearStatistics.save({ session })
            await sendOrderCreatedSuccessfully(userData)

            // if all processes above done successfully, the changes will saved in the database
            await session.commitTransaction();
            res.status(200).json({ ok: true });
        }
        else {
            /*
                if one of the processes above failed, 
                `session.abortTransaction` function will undo all changes
            */
            res.status(200).json({ ok: false });
            await session.abortTransaction();
        }
    } catch (error) {
        console.log(error?.message);
        await session.abortTransaction();
        res.status(400).json(false);
    } finally {
        await session.endSession();
    }
}