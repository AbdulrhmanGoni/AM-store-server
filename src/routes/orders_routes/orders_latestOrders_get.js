import OrdersControllers from "../../controllers/orders-controllers/OrdersControllers.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function orders_latestOrders_get(req, res) {
        const result = await OrdersControllers.getLatestOrders(req.query.limit);
        res.status(result ? 200 : 400).json(result);
    }
)