import { Router } from "express";
const router = Router();

import cobones_get from "../system_actions/cobones_get.js";

router.route("/cobones").get(cobones_get)

export default router