import { Router } from "express";
import orders_pagination_get from "../routes/orders_routes/orders_pagination_get.js";
import orders_getOrderById_get from "../routes/orders_routes/orders_getOrderById_get.js";
import orders_cancelOrder_delete from "../routes/orders_routes/orders_cancelOrder_delete.js";
import orders_latestOrders_get from "../routes/orders_routes/orders_latestOrders_get.js";
import orders_watchNewOrders_get from "../routes/orders_routes/orders_watchNewOrders_get.js";
import adnminAuth from "../auth/adminAuth.js";

const router = Router();

router.route("/latest-orders")
    .get([adnminAuth, orders_latestOrders_get]);
router.route("/watch-new-orders")
    .get([adnminAuth, orders_watchNewOrders_get]);

router.route("/pagenation").get(orders_pagination_get);

router.route("/:orderId")
    .get(orders_getOrderById_get)
    .delete(orders_cancelOrder_delete)


export default router;