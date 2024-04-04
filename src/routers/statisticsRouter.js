import { Router } from "express";

import statistics_get from "../routes/statistics_routes/statistics_get.js";
import statistics_setMonthTarget_get from "../routes/statistics_routes/statistics_setMonthTarget_get.js";

const router = Router();

router.get("/", statistics_get);

router.post("/monthly-targets", statistics_setMonthTarget_get);

export default router;