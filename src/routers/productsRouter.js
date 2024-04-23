import { Router } from "express";
import adminAuth from "../auth/adminAuth.js";
import products_topProducts_get from "../routes/products_routes/products_topProducts_get.js";
import products_length_get from "../routes/products_routes/products_length_get.js";
import products_pagination_get from "../routes/products_routes/products_pagination_get.js";
import products_searchByIds_post from "../routes/admin_routes/products_searchByIds_post.js";
import product_get from "../routes/products_routes/product_get.js";
import products_userSearch_get from "../routes/products_routes/products_userSearch_get.js";
import product_addRatingToProduct_post from "../routes/products_routes/product_addRatingToProduct_post.js";
import product_getProductRating_get from "../routes/products_routes/product_getProductRating_get.js";
import product_comments_get from "../routes/products_routes/product_comments_get.js";
import product_comments_delete from "../routes/products_routes/product_comments_delete.js";
import product_comments_post from "../routes/products_routes/product_comments_post.js";
import product_areUserBoughtAProductsBefore_get from "../routes/products_routes/product_areUserBoughtAProductsBefore_get.js";
import userAuth from "../auth/userAuth.js";
import product_comments_put from "../routes/products_routes/product_comments_put.js";

const router = Router();

router.route("/")
    .get(products_userSearch_get)
    .post(products_searchByIds_post)

router.route("/top-products")
    .get(products_topProducts_get)

router.route("/pagination")
    .get([adminAuth, products_pagination_get])

router.route("/length")
    .get(products_length_get)

router.route("/:productId")
    .get(product_get)

router.route("/:productId/are-user-bought-the-product-before")
    .get(product_areUserBoughtAProductsBefore_get)

router.route("/:productId/rating")
    .get(product_getProductRating_get)
    .post([userAuth, product_addRatingToProduct_post])

router.route("/:productId/comments")
    .get(product_comments_get)
    .post(product_comments_post)
    .put(product_comments_put)
    .delete(product_comments_delete)

export default router;