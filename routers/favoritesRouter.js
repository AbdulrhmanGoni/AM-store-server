import { Router } from "express";
const router = Router();


import authenticate from "../auth/authenticate.js";
import user_clearFavorites_delete from "../routes/users_routes/user_clearFavorites_delete.js";
import user_favorites_get from "../routes/users_routes/user_favorites_get.js";
import user_favorites_post from "../routes/users_routes/user_favorites_post.js";

router.use("/:userId", authenticate);

router.route("/:userId/favorites")
    .get(user_favorites_get)
    .post(user_favorites_post)
    .delete(user_clearFavorites_delete)

export default router