import { Router } from "express";
import authenticate from "../auth/authenticate.js";
import user_shoppingCart_get from "../routes/users_routes/user_shoppingCart_get.js";
import user_addToShoppingCart_post from "../routes/users_routes/user_addToShoppingCart_post.js";
import user_setShoppingCart_put from "../routes/users_routes/user_setShoppingCart_put.js";
import user_shoppingCart_delete from "../routes/users_routes/user_shoppingCart_delete.js";

const router = Router();

router.use("/:userId", authenticate);

router.route("/:userId/shopping-cart")
    .get(user_shoppingCart_get)
    .post(user_addToShoppingCart_post)
    .put(user_setShoppingCart_put)
    .delete(user_shoppingCart_delete)

export default router