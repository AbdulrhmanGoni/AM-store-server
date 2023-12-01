import { Router } from "express";

import adminAuth from "../auth/adminAuth.js";
import products_length_get from "../routes/products_routes/products_length_get.js";
import products_pagination_get from "../routes/products_routes/products_pagination_get.js";
import products_inStock_get from "../routes/products_routes/products_inStock_get.js";
import products_searchByIds from "../routes/admin_routes/products_searchByIds.js";
import product_get from "../routes/products_routes/product_get.js";
import products_userSearch_get from "../routes/products_routes/products_userSearch_get.js";
import product_comments_get from "../routes/products_routes/product_comments_get.js";
import product_comments_delete from "../routes/products_routes/product_comments_delete.js";
import product_comments_post from "../routes/products_routes/product_comments_post.js";
import product_areUserCanComment_get from "../routes/products_routes/product_areUserCanComment_get.js";

const router = Router();

router.route("/")
    .get(products_userSearch_get)
    .post(products_searchByIds)

router.route("/length")
    .get(products_length_get)

router.route("/in-stock")
    .get([adminAuth, products_inStock_get])

router.route("/pagination")
    .get([adminAuth, products_pagination_get])

router.route("/:productId")
    .get(product_get)

router.route("/:productId/are-user-can-comment")
    .get(product_areUserCanComment_get)

router.route("/:productId/comments")
    .get(product_comments_get)
    .post(product_comments_post)
    .delete(product_comments_delete)

export default router;