import { Router } from "express";

import products_post from "../routes/admin_routes/products_post.js";
import products_delete from "../routes/admin_routes/products_delete.js";
import product_patch from "../routes/admin_routes/product_patch.js";
import product_get from "../routes/admin_routes/product_get.js";
import products_createCategory_post from "../routes/admin_routes/products_createCategory_post.js";
import products_search_get from "../routes/admin_routes/products_search_get.js";
import products_addDiscount_post from "../routes/admin_routes/products_addDiscount_post.js";
import products_removeDiscount_delete from "../routes/admin_routes/products_removeDiscount_delete.js";

const router = Router();

router.route("/products")
    .get(products_search_get)
    .post(products_post)
    .delete(products_delete)

router.route("/products/create-category")
    .post(products_createCategory_post)

router.route("/products/discounts")
    .post(products_addDiscount_post)
    .delete(products_removeDiscount_delete)

router.route("/products/:productId")
    .get(product_get)
    .patch(product_patch)

export default router;