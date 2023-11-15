import OrdersControllers from "../../controllers/orders-controllers/OrdersControllers";

export default async function orders_getUserOrders_get(req, res) {
    const { userId } = req.params;
    try {
        const orders = await OrdersControllers.getOrders({ userId }, req.query)
        orders && res.status(200).json(orders)
        !orders && res.status(404).json(null)
    } catch (error) {
        res.status(400).json(null);
    }
}