import { Router } from "express";
const router = Router();

import favorites_get from "../user_actions/favorites_get.js";
import favorites_set from "../user_actions/favorites_set.js";
import favorites_clear from "../user_actions/favorites_clear.js";

router.route("/:userId/favorites")
    .get(favorites_get)
    .post(favorites_set)
    .delete(favorites_clear)


export default router