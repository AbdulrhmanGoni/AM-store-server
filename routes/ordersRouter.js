import { Router } from "express";
import ordersPagination from '../system_actions/orders_pagination.js'

const router = Router();

router.route("/pagenation").get(ordersPagination)


export default router;