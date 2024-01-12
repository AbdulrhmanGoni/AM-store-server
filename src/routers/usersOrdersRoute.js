import { Router } from "express";
const router = Router();

import authenticate from "../auth/authenticate.js";
import orders_getUserOrders_get from "../routes/orders_routes/orders_getUserOrders_get.js";
import orders_addNewOrder_post from "../routes/orders_routes/orders_addNewOrder_post.js";

router.use("/:userId", authenticate);

router.route("/:userId/orders")
    .get(orders_getUserOrders_get)
    .post(orders_addNewOrder_post)

export default router;