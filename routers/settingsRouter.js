import { Router } from "express";
import cobones_get from "../routes/settings_routes/cobones_get.js";

const router = Router();

router.route("/cobones").get(cobones_get)

export default router