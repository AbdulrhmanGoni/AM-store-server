import OrdersControllers from "../../controllers/orders-controllers/OrdersControllers.js";


export default async function orders_cancelOrder_delete(req, res) {
    try {
        const { type } = req.query;
        const { orderId } = req.params;
        const { userId } = req;
        if (type === "cancel") {
            const response = await OrdersControllers.cancelOrder(orderId, userId);
            if (response) res.status(200).json(response);
            else res.status(400).json(false);
        }
        else res.status(400).json(false);
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}
