import { Router } from "express";
const router = Router();

import authenticate from "../auth/authenticate.js";
import orders_getUserOrders_get from "../routes/orders_routes/orders_getUserOrders_get.js";
import orders_addNewOrder_post from "../routes/orders_routes/orders_addNewOrder_post.js";
import orders_getOrderById_get from "../routes/orders_routes/orders_getOrderById_get.js";
import orders_cancelOrder_delete from "../routes/orders_routes/orders_cancelOrder_delete.js";

router.use("/:userId", authenticate)

router.route("/:userId/orders")
    .get(orders_getUserOrders_get)
    .post(orders_addNewOrder_post)

router.route("/:userId/orders/:orderId")
    .get(orders_getOrderById_get)
    .delete(orders_cancelOrder_delete)

export default router;