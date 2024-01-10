import { Router } from "express";

import products_put from "../routes/admin_routes/products_put.js";
import products_delete from "../routes/admin_routes/products_delete.js";
import product_patch from "../routes/admin_routes/product_patch.js";
import product_get from "../routes/products_routes/product_get.js";
import products_search_get from "../routes/admin_routes/products_search_get.js";
import products_addDiscount_put from "../routes/admin_routes/products_addDiscount_put.js";
import products_removeDiscount_delete from "../routes/admin_routes/products_removeDiscount_delete.js";

const router = Router();

router.route("/products")
    .get(products_search_get)
    .put(products_put)
    .delete(products_delete)

router.route("/products/discounts")
    .put(products_addDiscount_put)
    .delete(products_removeDiscount_delete)

router.route("/products/:productId")
    .get(product_get)
    .patch(product_patch)
    .delete(products_delete)

export default router;