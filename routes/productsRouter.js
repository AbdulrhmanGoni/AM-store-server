import { Router } from "express";
const router = Router();

import products_search from "../user_actions/products_search.js";
import products_getById from "../user_actions/products_getById.js";
import products_getByIds from "../user_actions/products_getByIds.js";
import products_deleteMany from "../user_actions/products_deleteMany.js";
import products_delete from "../user_actions/products_delete.js";
import comments_get from "../user_actions/comments_get.js";
import comments_delete from "../user_actions/comments_delete.js";
import comments_set from "../user_actions/comment_set.js";
import rating_get from "../user_actions/rating_get.js";
import rating_set from "../user_actions/rating_set.js";
import products_pagination from "../user_actions/products_pagination.js";

router.route("/")
    .get(products_search)
    .post(products_getByIds)
    .delete(products_deleteMany)

router.route("/pagination")
    .get(products_pagination)

router.route("/:productId")
    .get(products_getById)
    .delete(products_delete)

router.route("/:productId/comments")
    .get(comments_get)
    .post(comments_set)
    .delete(comments_delete)

router.route("/:productId/rating")
    .get(rating_get)
    .post(rating_set)




export default router;