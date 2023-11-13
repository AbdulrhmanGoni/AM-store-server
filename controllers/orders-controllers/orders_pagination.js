import OrdersModule from "../../models/Orders.js";

export default async function orders_pagination(req, res) {
    try {
        const { page } = req.query;
        const orders = OrdersModule.find({ page });
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(400).json(null);
    }
}
