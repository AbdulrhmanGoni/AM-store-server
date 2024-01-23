import { Router } from "express";
import user_clearFavorites_delete from "../routes/users_routes/user_clearFavorites_delete.js";
import user_favorites_get from "../routes/users_routes/user_favorites_get.js";
import user_favorites_post from "../routes/users_routes/user_favorites_post.js";
import user_favorites_put from "../routes/users_routes/user_favorites_put.js";

const router = Router();

router.route("/:userId/favorites")
    .get(user_favorites_get)
    .post(user_favorites_post)
    .put(user_favorites_put)
    .delete(user_clearFavorites_delete)

export default router