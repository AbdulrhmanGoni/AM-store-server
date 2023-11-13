import getOrders from "../system_actions/getOrders.js";

const orders_getUserOrders = async (req, res) => {
    const { orderId, userId } = req.params;
    try {
        const orders = await getOrders({ orderId, userId }, req.query)
        orders && res.status(200).json(orders)
        !orders && res.status(404).json(null)
    } catch (error) {
        res.status(400).json(null);
    }
}

export default orders_getUserOrders;