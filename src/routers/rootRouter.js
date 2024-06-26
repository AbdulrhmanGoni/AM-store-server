import { Router } from "express";
import userAuth from "../auth/userAuth.js";
import adminAuth from "../auth/adminAuth.js";
import logIn_user_post from "../routes/root_routes/logIn_user_post.js";
import logIn_user_withGoogle_post from "../routes/root_routes/logIn_user_withGoogle_post.js";
import register_user_post from "../routes/root_routes/register_user_post.js";
import register_user_withGoogle_post from "../routes/root_routes/register_user_withGoogle_post.js";
import logIn_admin_post from "../routes/root_routes/logIn_admin_post.js";
import logIn_admin_withGoogle_post from "../routes/root_routes/logIn_admin_withGoogle_post.js";
import logIn_loggedUser_get from "../routes/root_routes/logIn_loggedUser_get.js";
import logIn_loggedAdmin_get from "../routes/root_routes/logIn_loggedAdmin_get.js";
import notifications_get from "../routes/root_routes/notifications_get.js";
import emailVerification_get from "../routes/root_routes/emailVerification_get.js";
import emailVerification_post from "../routes/root_routes/emailVerification_post.js";
import emailVerificationLimit from "../middlewares/emailVerificationLimit.js";
import feedbacks_SSE_get from "../routes/root_routes/feedbacks_SSE_get.js";
import feedbacks_get from "../routes/root_routes/feedbacks_get.js";
import feedbacks_post from "../routes/root_routes/feedbacks_post.js";
import feedbacks_delete from "../routes/root_routes/feedbacks_delete.js";
import forgetPassword_post from "../routes/root_routes/forgetPassword_post.js";
import notifications_setAsRead_post from "../routes/root_routes/notifications_setAsRead_post.js";
import userIdChecker from "../middlewares/userIdChecker.js";

const router = Router();

router.route("/log-in/google-auth").post(logIn_user_withGoogle_post);
router.route("/log-in/:userId").get([userAuth, userIdChecker, logIn_loggedUser_get]);
router.route("/log-in").post(logIn_user_post);

router.route("/sign-up/google-auth").post(register_user_withGoogle_post);
router.route("/sign-up").post(register_user_post);

router.route("/admin-log-in/google-auth").post(logIn_admin_withGoogle_post);
router.route("/admin-log-in/:adminId").get([adminAuth, logIn_loggedAdmin_get]);
router.route("/admin-log-in").post(logIn_admin_post);

router.route("/notifications")
    .get([adminAuth, notifications_get])
    .post([adminAuth, notifications_setAsRead_post])

router.route("/feedbacks/receive-sse")
    .get([adminAuth, feedbacks_SSE_get])

router.route("/feedbacks")
    .get([adminAuth, feedbacks_get])
    .post(feedbacks_post)
    .delete(feedbacks_delete)

router.route("/email-verification")
    .get([emailVerificationLimit(), userAuth, emailVerification_get])
    .post([userAuth, emailVerification_post]);

router.route("/forget-password")
    .post(forgetPassword_post)

export default router;