import { Router } from "express";
import products_get from "../admin_actions/products_get.js";
import products_search from "../admin_actions/products_search.js";
import products_set from "../admin_actions/products_set.js";
import products_delete from "../user_actions/products_delete.js";
import products_deleteMany from "../user_actions/products_deleteMany.js";
import products_updateProduct from "../admin_actions/products_updateProduct.js";

const router = Router();

router.route("/products")
    .get(products_get)
    .post(products_set)
    .delete(products_deleteMany)

router.route("/products/:productId")
    .get(products_get)
    .post(products_updateProduct)
    .delete(products_delete)

export default router;