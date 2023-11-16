import { Router } from "express";
import orders_pagination_get from "../routes/orders_routes/orders_pagination_get.js";

const router = Router();

router.route("/pagenation").get(orders_pagination_get);

export default router;