import { Router } from "express";
import products_set from "../admin_actions/products_set.js";
const router = Router();


router.route("/products").post(products_set)

export default router;