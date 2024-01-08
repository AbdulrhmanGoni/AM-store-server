import OrdersControllers from "../../controllers/orders-controllers/OrdersControllers.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function orders_getUserOrders_get(req, res) {
        const { userId } = req.params;
        const orders = await OrdersControllers.getOrders({ userId }, req.query)
        orders && res.status(200).json(orders)
        !orders && res.status(404).json(null)
    }
)