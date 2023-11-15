import OrdersControllers from "../../controllers/orders-controllers/OrdersControllers";


export default async function orders_pagination_get(req, res) {
    try {
        const orders = await OrdersControllers.ordersPagination(req.query.page);
        orders && res.status(200).json(orders);
        !orders && res.status(400).json(null);
    } catch (error) {
        console.log(error)
        res.status(400).json(null);
    }
}
