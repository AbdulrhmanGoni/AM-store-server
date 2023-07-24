import { Router } from "express";
const router = Router();

import orders_getUserOrders from "../user_actions/orders_getUserOrders.js";
import orders_getById from "../user_actions/orders_getById.js";
import orders_addNewOrder from "../user_actions/orders_addNewOrder.js";
import orders_cancel from "../user_actions/orders_cancel.js";


router.route("/:orderId")
    .get(orders_getById)

router.route("/")
    .get(orders_getUserOrders)
    .post(orders_addNewOrder)
    .delete(orders_cancel)

export default router;