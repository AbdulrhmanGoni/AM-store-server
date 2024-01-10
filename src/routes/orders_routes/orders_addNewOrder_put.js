import OrdersControllers from '../../controllers/orders-controllers/OrdersControllers.js'
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';

export default asyncRouteHandler(
    async function orders_addNewOrder_put(req, res) {
        const response = await OrdersControllers.addNewOrder(req.body.theOrder);
        response && res.status(200).json(response);
        !response && res.status(400).json(response);
    }
)