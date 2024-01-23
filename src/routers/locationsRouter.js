import { Router } from "express";
import user_locations_get from "../routes/users_routes/user_locations_get.js";
import user_locations_post from "../routes/users_routes/user_locations_post.js";
import user_locations_delete from "../routes/users_routes/user_locations_delete.js";

const router = Router();

router.route("/:userId/locations")
    .get(user_locations_get)
    .post(user_locations_post)
    .delete(user_locations_delete)


export default router