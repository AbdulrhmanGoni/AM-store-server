import { Router } from "express";

import statistics_get from "../routes/statistics_routes/statistics_get.js";

const router = Router();

router.get("/", statistics_get);

export default router;