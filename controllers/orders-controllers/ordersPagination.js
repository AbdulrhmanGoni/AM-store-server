import OrdersModule from "../../models/Orders.js";

export default async function ordersPagination(page) {
    try {
        return OrdersModule.find({ page });
    } catch (error) {
        return;
    }
}
