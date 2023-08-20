import { Router } from "express";
const router = Router();

import orders_getUserOrders from "../user_actions/orders_getUserOrders.js";
import orders_getById from "../user_actions/orders_getById.js";
import orders_cancel from "../user_actions/orders_cancel.js";
import authenticate from "../midelwheres/authenticate.js";
import orders_addNewOrder from "../user_actions/orders_addNewOrder.js";

router.use("/:userId", authenticate)

router.route("/:userId/orders")
    .get(orders_getUserOrders)
    .post(orders_addNewOrder)

router.route("/:userId/orders/:orderId")
    .get(orders_getById)
    .delete(orders_cancel)

export default router;