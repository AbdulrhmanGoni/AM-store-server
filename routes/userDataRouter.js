import { Router } from "express";
import userData_get from "../user_actions/userData_get.js";
import userData_set from "../user_actions/userData_set.js";
import userData_uploadAvatar from "../user_actions/userData_uploadAvatar.js";
import passwordChecker from "../user_actions/passwordChecker.js";
import authenticate from "../middleware/authenticate.js";
import adminAuth from "../middleware/adminAuth.js";
import searchForUsers from "../admin_actions/searchForUsers.js";


const router = Router();

router.route("/").get([adminAuth, searchForUsers])

router.use("/:userId", authenticate)

router.route("/:userId")
    .get(userData_get)
    .post(userData_set)

router.route("/:userId/upload-avatar")
    .post(userData_uploadAvatar)

router.route("/:userId/password")
    .post(passwordChecker)

export default router