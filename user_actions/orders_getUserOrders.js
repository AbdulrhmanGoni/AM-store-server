import Orders from "../models/Orders.js";

const orders_getUserOrders = async (req, res) => {
    try {
        const { userId, state } = req.query;
        const orders = await Orders.find({ userId, state }).sort({ "createdAt": -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json(null);
    }
}

export default orders_getUserOrders;