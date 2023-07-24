import OrdersModel from "../models/Orders.js";
import ProductsModule from "../models/Products.js";
import ProductsStatisticsModel from "../models/ProductsStatistics.js";
import UsersModel from "../models/Users.js";

async function clean(req, res) {
    try {
        await OrdersModel.deleteMany({});
        await UsersModel.updateMany({}, { $set: { userOrders: [] } });
        await ProductsModule.updateMany({}, { $set: { earnings: 0, sold: 0, amount: 25 } })
        await ProductsStatisticsModel.deleteMany({});
        console.log("cleeeeeeeeeeeeeeeeeeeeear done!");
        res.status(200).json("cleeeeeeeeeeeeeeeeeeeeear done!");
    } catch (error) {
        console.log(error);
        res.status(400).json([]);
    }
}

export default clean