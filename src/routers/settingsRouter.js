import { Router } from "express";
import settings_get from "../routes/settings_routes/settings_get.js";
import cobones_get from "../routes/settings_routes/cobones_get.js";
import cobones_addCobone_post from "../routes/settings_routes/cobones_addCobone_post.js";
import adminAuth from "../auth/adminAuth.js";
import cobones_deleteCobone_delete from "../routes/settings_routes/cobones_deleteCobone_delete.js";
import settings_storeVariables_get from "../routes/settings_routes/settings_storeVariables_get.js";
import settings_updateSetting_post from "../routes/settings_routes/settings_updateSetting_post.js";

const router = Router();

router.route("/")
    .get([adminAuth, settings_get])
    .post([adminAuth, settings_updateSetting_post])

router.route("/cobones")
    .get(cobones_get)
    .post([adminAuth, cobones_addCobone_post])
    .delete([adminAuth, cobones_deleteCobone_delete])

router.route("/variables")
    .get(settings_storeVariables_get)

export default router