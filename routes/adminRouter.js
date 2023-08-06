import { Router } from "express";
import products_set from "../admin_actions/products_set.js";
import products_delete from "../user_actions/products_delete.js";
import products_deleteMany from "../user_actions/products_deleteMany.js";

const router = Router();


router.route("/products")
    .post(products_set)
    .delete(products_deleteMany)

router.route("/products/productId")
    .delete(products_delete)


export default router;