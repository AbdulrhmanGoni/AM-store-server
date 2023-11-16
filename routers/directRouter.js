import { Router } from "express";

import authenticate from "../auth/authenticate.js";
import adminAuth from "../auth/adminAuth.js";
import logIn_user_post from "../routes/root_routes/logIn_user_post.js";
import logIn_user_withGoogle_post from "../routes/root_routes/logIn_user_withGoogle_post.js";
import register_user_post from "../routes/root_routes/register_user_post.js";
import register_user_withGoogle_post from "../routes/root_routes/register_user_withGoogle_post.js";
import logIn_admin_post from "../routes/root_routes/logIn_admin_post.js";
import logIn_admin_withGoogle_post from "../routes/root_routes/logIn_admin_withGoogle_post.js";
import logIn_loggedUser_get from "../routes/root_routes/logIn_loggedUser_get.js";
import logIn_loggedAdmin_get from "../routes/root_routes/logIn_loggedAdmin_get.js";
import emailVerification_get from "../routes/root_routes/emailVerification_get.js";
import emailVerification_post from "../routes/root_routes/emailVerification_post.js";

const router = Router();

router.route("/log-in/google-auth").post(logIn_user_withGoogle_post);
router.route("/log-in/:userId").get([authenticate, logIn_loggedUser_get]);
router.route("/log-in").post(logIn_user_post);

router.route("/sign-up/google-auth").post(register_user_withGoogle_post);
router.route("/sign-up").post(register_user_post);

router.route("/admin-log-in/google-auth").post(logIn_admin_withGoogle_post);
router.route("/admin-log-in/:adminId").get([adminAuth, logIn_loggedAdmin_get]);
router.route("/admin-log-in").post(logIn_admin_post);

router.route("/check-user-state").get([authenticate, (_, res) => { res.status(200).json(true) }]);
router.route("/email-verification")
    .get([authenticate, emailVerification_get])
    .post([authenticate, emailVerification_post]);

export default router;