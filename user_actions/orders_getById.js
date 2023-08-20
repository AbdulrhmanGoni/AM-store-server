import Orders from "../models/Orders.js";

const orders_getById = async (req, res) => {
    const { orderId, userId } = req.params;
    try {
        const theOrder = await Orders.findOne({ _id: orderId, userId });
        res.status(200).json(theOrder);
    } catch {
        res.status(400).json(null);
    }
}

export default orders_getById;