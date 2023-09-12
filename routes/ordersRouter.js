import { Router } from "express";
import ordersPagenation from '../system_actions/orders_pagination.js'

const router = Router();

router.route("/").get(ordersPagenation)


export default router;