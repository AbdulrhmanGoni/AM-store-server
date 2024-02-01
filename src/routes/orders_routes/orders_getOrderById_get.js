import OrdersControllers from "../../controllers/orders-controllers/OrdersControllers.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function orders_getOrderById_get(req, res) {
        const { userId, params: { orderId } } = req;
        if (userId && orderId) {
            const orders = await OrdersControllers.getOrders({ orderId, userId }, req.query)
            if (orders?.length) res.status(200).json(orders[0])
            else res.status(404).json(null)
        } else res.status(400).json()
    }
)