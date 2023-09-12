import { Router } from "express";
const router = Router();

import user_logIn from "../user_actions/user_logIn.js";
import user_Logged from "../user_actions/user_Logged.js";
import user_regist from "../user_actions/user_regist.js";
import sendFeedback from "../user_actions/sendFeedback.js";
import authenticate from "../midelwheres/authenticate.js";
import admin_logIn from "../admin_actions/admin_logIn.js";
import admin_logIn_withGoogle from "../admin_actions/admin_logIn_withGoogle.js";
import admin_Logged from "../admin_actions/admin_Logged.js";
import adminAuth from "../midelwheres/adminAuth.js";
import user_regist_withGoogle from "../user_actions/user_regist_withGoogle.js";
import user_logIn_withGoogle from "../user_actions/user_logIn_withGoogle.js";

router.route("/log-in/google-auth").post(user_logIn_withGoogle);
router.route("/log-in/:userId").get([authenticate, user_Logged]);
router.route("/log-in").post(user_logIn);

router.route("/sign-up/google-auth").post(user_regist_withGoogle);
router.route("/sign-up").post(user_regist);

router.route("/admin-log-in/google-auth").post(admin_logIn_withGoogle);
router.route("/admin-log-in/:adminId").get([adminAuth, admin_Logged]);
router.route("/admin-log-in").post(admin_logIn);
router.route("/mails").post([authenticate, sendFeedback]);

export default router;