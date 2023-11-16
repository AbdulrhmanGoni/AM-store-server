import getOrders from "./getOrders.js"
import addNewOrder from "./addNewOrder.js"
import ordersPagination from "./ordersPagination.js"
import cancelOrder from "./cancelOrder.js"
import getLatestOrders from "./getLatestOrders.js"

class OrdersControllers {
    constructor() { }
}

export default Object.assign(OrdersControllers.prototype, {
    getOrders,
    addNewOrder,
    ordersPagination,
    cancelOrder,
    getLatestOrders
})