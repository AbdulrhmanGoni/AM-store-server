import OrdersControllers from "../../controllers/orders-controllers/OrdersControllers.js";

export default async function orders_latestOrders_get(req, res) {
    try {
        const result = await OrdersControllers.getLatestOrders(req.query.limit);
        res.status(result ? 200 : 400).json(result);
    } catch (error) {
        res.status(500).json();
    }
}