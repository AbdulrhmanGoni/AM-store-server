import { Router } from "express";
import orders_pagination_get from "../routes/orders_routes/orders_pagination_get.js";
import orders_getOrderById_get from "../routes/orders_routes/orders_getOrderById_get.js";
import orders_cancelOrder_delete from "../routes/orders_routes/orders_cancelOrder_delete.js";
import orders_latestOrders_get from "../routes/orders_routes/orders_latestOrders_get.js";
import orders_watchNewOrders_get from "../routes/orders_routes/orders_watchNewOrders_get.js";
import adnminAuth from "../auth/adminAuth.js";
import orders_addNewOrder_post from "../routes/orders_routes/orders_addNewOrder_post.js";
import orders_getUserOrders_get from "../routes/orders_routes/orders_getUserOrders_get.js";
import authenticate from "../auth/authenticate.js";

const router = Router();

router.route("/users")
    .get([authenticate, orders_getUserOrders_get])
    .post([authenticate, orders_addNewOrder_post])

router.route("/latest-orders")
    .get([adnminAuth, orders_latestOrders_get]);

router.route("/watch-new-orders")
    .get([adnminAuth, orders_watchNewOrders_get]);

router.route("/pagenation")
    .get([adnminAuth, orders_pagination_get]);

router.route("/:orderId")
    .get([authenticate, orders_getOrderById_get])
    .delete([authenticate, orders_cancelOrder_delete])

export default router;