
import OrdersControllers from '../../controllers/orders-controllers/OrdersControllers'

export default async function orders_addNewOrder_post(req, res) {
    try {
        const response = await OrdersControllers.addNewOrder(req.body.theOrder);
        response && res.status(200).json(response);
        !response && res.status(400).json(response);
    } catch (error) {
        console.log(error)
        res.status(400).json(null);
    }
}
