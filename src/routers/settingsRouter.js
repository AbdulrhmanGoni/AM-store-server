import { Router } from "express";
import cobones_get from "../routes/settings_routes/cobones_get.js";
import cobones_addCobone_post from "../routes/settings_routes/cobones_addCobone_post.js";
import adminAuth from "../auth/adminAuth.js";
import cobones_deleteCobone_delete from "../routes/settings_routes/cobones_deleteCobone_delete.js";

const router = Router();

router.route("/cobones")
    .get(cobones_get)
    .post([adminAuth, cobones_addCobone_post])
    .delete([adminAuth, cobones_deleteCobone_delete])

export default router