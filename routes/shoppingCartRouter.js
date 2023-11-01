import { Router } from "express";
const router = Router();

import shoppingCart_get from "../user_actions/shoppingCart_get.js";
import shoppingCart_set from "../user_actions/shoppingCart_set.js";
import shoppingCart_remove from "../user_actions/shoppingCart_remove.js";
import authenticate from "../auth/authenticate.js";

router.use("/:userId", authenticate)

router.route("/:userId/shopping-cart")
    .get(shoppingCart_get)
    .post(shoppingCart_set)
    .delete([shoppingCart_remove, shoppingCart_get])


export default router