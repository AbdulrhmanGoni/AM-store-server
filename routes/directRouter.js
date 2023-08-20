import { Router } from "express";
const router = Router();

import user_logIn from "../user_actions/user_logIn.js";
import user_Logged from "../user_actions/user_Logged.js";
import user_regist from "../user_actions/user_regist.js";
import sendFeedback from "../user_actions/sendFeedback.js";
import authenticate from "../midelwheres/authenticate.js";
import admin_logIn from "../admin_actions/admin_logIn.js";
import admin_Logged from "../admin_actions/admin_Logged.js";
import adminAuth from "../midelwheres/adminAuth.js";

router.route("/log-in/:userId").get([authenticate, user_Logged]);
router.route("/log-in").post(user_logIn);
router.route("/sign-up").post(user_regist);
router.route("/admin-log-in/:adminId").get([adminAuth, admin_Logged]);
router.route("/admin-log-in").post(admin_logIn);
router.route("/mails").post([authenticate, sendFeedback]);


export default router;