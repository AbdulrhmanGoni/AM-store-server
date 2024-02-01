import OrdersControllers from "../../controllers/orders-controllers/OrdersControllers.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";


export default asyncRouteHandler(
    async function orders_cancelOrder_delete(req, res) {
        const { type } = req.query;
        const { userId, params: { orderId } } = req;
        if (type === "cancel") {
            const response = await OrdersControllers.cancelOrder(orderId, userId);
            if (response) res.status(200).json(response);
            else res.status(400).json(false);
        }
        else res.status(400).json(false);
    }
)