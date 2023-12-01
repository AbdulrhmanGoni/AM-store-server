import OrdersModel from "../../models/Orders.js";

export default async function ordersPagination(page) {
    try {
        return OrdersModel.find({ page });
    } catch (error) {
        return;
    }
}
