import Orders from "../models/Orders.js";

const orders_getById = async (req, res) => {
    try {
        const theOrder = await Orders.findById(req.params.orderId);
        res.status(200).json(theOrder);
    } catch {
        res.status(400).json(null);
    }
}

export default orders_getById;