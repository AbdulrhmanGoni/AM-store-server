import mongoose from "mongoose";
import OrdersModel from "../../models/Orders.js";
import UsersModel from "../../models/Users.js";
import { userDataTypes } from "../../CONSTANT/projections.js";
import sendOrderCreatedSuccessfully from "../../utilities/sendOrderCreatedSuccessfully.js";
import getYearStatisticsDocument from "../statistics-controllers/getYearStatisticsDocument.js";
import registerProductsStatistics from "../statistics-controllers/registerProductsStatistics.js";
import registerOrderStatistics from "../statistics-controllers/registerOrderStatistics.js";


export default async function addNewOrder(theOrder) {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const { products, totalPrice } = theOrder;

        const newOrder = await new OrdersModel(theOrder).save({ session })
        const userData = await UsersModel.findOneAndUpdate(
            { _id: theOrder.userId },
            { $set: { userShoppingCart: [] }, $push: { userOrders: newOrder._id } },
            { session, projection: userDataTypes.basic }
        );

        // Bring the document that contains the statistics of current year
        const currentYearStatistics = await getYearStatisticsDocument();

        // Add order's total price to the total earnings of current month.
        // And Sum order's products count with the total of the sold products in current month.
        const addingOrderStatisticsDone = registerOrderStatistics({ products, totalPrice }, currentYearStatistics);

        /*
            Update order's products: 
            - decrementing product's quantity in stock.
            - incrementing how many times the product sold. 
            ect...
        */
        const addingProductsStatisticsDone = await registerProductsStatistics(products, currentYearStatistics, session);

        if (addingOrderStatisticsDone && addingProductsStatisticsDone) {
            await currentYearStatistics.save({ session })
            await sendOrderCreatedSuccessfully(userData)

            // if all processes above done successfully, the changes will saved in the database
            await session.commitTransaction();
            return { ok: true, newOrder };
        }
        else {
            /*
                if one of the processes above failed, 
                `session.abortTransaction` function will undo all changes
            */
            await session.abortTransaction();
            return { ok: false };
        }
    } catch (error) {
        console.log(error?.message);
        await session.abortTransaction();
        return { ok: false }
    } finally {
        await session.endSession();
    }
}