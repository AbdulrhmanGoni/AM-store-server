import OrdersControllers from '../../controllers/orders-controllers/OrdersControllers.js'
import asyncRouteHandler from '../../utilities/asyncRouteHandler.js';
import sendNewOrderEvent from '../../utilities/sendNewOrderEvent.js';

export default asyncRouteHandler(
    async function orders_addNewOrder_post(req, res) {
        const { theOrder, user } = req.body
        const { ok, newOrder } = await OrdersControllers.addNewOrder(theOrder);
        if (ok) {
            sendNewOrderEvent(newOrder, user)
            res.status(200).json({ ok });
        } else {
            res.status(400).json();
        }
    }
)