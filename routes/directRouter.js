import { Router } from "express";
const router = Router();

import user_logIn from "../user_actions/user_logIn.js";
import user_Logged from "../user_actions/user_Logged.js";
import user_register from "../user_actions/user_register.js";
import authenticate from "../auth/authenticate.js";
import admin_logIn from "../admin_actions/admin_logIn.js";
import admin_logIn_withGoogle from "../admin_actions/admin_logIn_withGoogle.js";
import admin_Logged from "../admin_actions/admin_Logged.js";
import adminAuth from "../auth/adminAuth.js";
import user_register_withGoogle from "../user_actions/user_register_withGoogle.js";
import user_logIn_withGoogle from "../user_actions/user_logIn_withGoogle.js";
import userEmailVerification from "../system_actions/userEmailVerification.js";
import verifyUserEmail from "../system_actions/verifyUserEmail.js";

router.route("/log-in/google-auth").post(user_logIn_withGoogle);
router.route("/log-in/:userId").get([authenticate, user_Logged]);
router.route("/log-in").post(user_logIn);

router.route("/sign-up/google-auth").post(user_register_withGoogle);
router.route("/sign-up").post(user_register);

router.route("/admin-log-in/google-auth").post(admin_logIn_withGoogle);
router.route("/admin-log-in/:adminId").get([adminAuth, admin_Logged]);
router.route("/admin-log-in").post(admin_logIn);


router.route("/check-user-state").get([authenticate, (_, res) => { res.status(200).json(true) }]);
router.route("/email-verification")
    .get([authenticate, userEmailVerification])
    .post([authenticate, verifyUserEmail]);

export default router;