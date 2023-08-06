import { Router } from "express";
const router = Router();

import products_search from "../user_actions/products_search.js";
import products_getById from "../user_actions/products_getById.js";
import products_getByIds from "../user_actions/products_getByIds.js";
import comments_get from "../user_actions/comments_get.js";
import comments_delete from "../user_actions/comments_delete.js";
import comments_set from "../user_actions/comment_set.js";
import rating_get from "../user_actions/rating_get.js";
import rating_set from "../user_actions/rating_set.js";
import products_pagination from "../user_actions/products_pagination.js";
import products_pagination_length from "../user_actions/products_pagination_length.js";

router.route("/")
    .get(products_search)
    .post(products_getByIds)

router.route("/pagination")
    .get(products_pagination)

router.route("/pagination/length")
    .get(products_pagination_length)

router.route("/:productId")
    .get(products_getById)

router.route("/:productId/comments")
    .get(comments_get)
    .post(comments_set)
    .delete(comments_delete)

router.route("/:productId/rating")
    .get(rating_get)
    .post(rating_set)




export default router;