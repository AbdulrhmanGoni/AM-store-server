import OrdersControllers from '../../controllers/orders-controllers/OrdersControllers.js'
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';

export default asyncRouteHandler(
    async function orders_addNewOrder_post(req, res) {
        const response = await OrdersControllers.addNewOrder(req.body.theOrder);
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(400).json();
        }
    }
)