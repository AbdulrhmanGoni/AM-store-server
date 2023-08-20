import { Router } from "express";
const router = Router();

import locations_get from "../user_actions/locations_get.js";
import locations_set from "../user_actions/locations_set.js";
import locations_delete from "../user_actions/locations_delete.js";
import authenticate from "../midelwheres/authenticate.js";

router.use("/:userId", authenticate)

router.route("/:userId/locations")
    .get(locations_get)
    .post([locations_set, locations_get])
    .delete([locations_delete, locations_get])


export default router