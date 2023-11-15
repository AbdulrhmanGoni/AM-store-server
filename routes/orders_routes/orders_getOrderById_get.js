import OrdersControllers from "../../controllers/orders-controllers/OrdersControllers.js";

export default async function orders_getOrderById_get(req, res) {
    const { orderId, userId } = req.params;
    try {
        const orders = await OrdersControllers.getOrders({ orderId, userId }, req.query)
        if (orders?.length) res.status(200).json(orders[0])
        else res.status(404).json(null)
    } catch {
        res.status(400).json(null);
    }
}