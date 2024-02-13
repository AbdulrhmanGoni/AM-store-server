import { Router } from "express";
import user_get from "../routes/users_routes/user_get.js";
import user_uploadAvatar_put from "../routes/users_routes/user_uploadAvatar_put.js";
import user_checkPassword_post from "../routes/users_routes/user_checkPassword_post.js";
import user_changePassword_post from "../routes/users_routes/user_changePassword_post.js";
import user_updateUserName_patch from "../routes/users_routes/user_updateUserName_patch.js";
import checkingUserPasswordLimit from "../middlewares/checkingUserPasswordLimit.js";
import userIdChecker from "../middlewares/userIdChecker.js";

const router = Router();

router.use("/:userId", userIdChecker);

router.route("/:userId")
    .get(user_get)
    .patch(user_updateUserName_patch)

router.route("/:userId/upload-avatar")
    .put(user_uploadAvatar_put)

router.route("/:userId/check-password")
    .post([checkingUserPasswordLimit(), user_checkPassword_post])

router.route("/:userId/change-password")
    .post(user_changePassword_post)

export default router;