import OrdersControllers from "../../controllers/orders-controllers/OrdersControllers.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";


export default asyncRouteHandler(
    async function orders_pagination_get(req, res) {
        const orders = await OrdersControllers.ordersPagination(req.query.page);
        orders && res.status(200).json(orders);
        !orders && res.status(400).json(null);
    }
)