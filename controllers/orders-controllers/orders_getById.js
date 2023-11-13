import getOrders from "../system_actions/getOrders.js";


const orders_getById = async (req, res) => {
    const { orderId, userId } = req.params;
    try {
        const orders = await getOrders({ orderId, userId }, req.query)
        if (orders?.length) res.status(200).json(orders[0])
        else res.status(404).json(null)
    } catch {
        res.status(400).json(null);
    }
}

export default orders_getById;