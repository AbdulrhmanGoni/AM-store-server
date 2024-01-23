import { Router } from "express";
import orders_getUserOrders_get from "../routes/orders_routes/orders_getUserOrders_get.js";
import orders_addNewOrder_post from "../routes/orders_routes/orders_addNewOrder_post.js";

const router = Router();

router.route("/:userId/orders")
    .get(orders_getUserOrders_get)
    .post(orders_addNewOrder_post)

export default router;