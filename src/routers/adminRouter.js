import { Router } from "express";

import products_post from "../routes/admin_routes/products_post.js";
import products_delete from "../routes/admin_routes/products_delete.js";
import product_post from "../routes/admin_routes/product_post.js";
import product_get from "../routes/products_routes/product_get.js";
import products_search_get from "../routes/admin_routes/products_search_get.js";
import products_addDiscount_post from "../routes/admin_routes/products_addDiscount_post.js";

const router = Router();

router.route("/products")
    .get(products_search_get)
    .post(products_post)
    .delete(products_delete)

router.route("/products/discounts")
    .post(products_addDiscount_post)

router.route("/products/:productId")
    .get(product_get)
    .post(product_post)
    .delete(products_delete)

export default router;