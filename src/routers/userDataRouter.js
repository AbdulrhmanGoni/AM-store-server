import { Router } from "express";
import authenticate from "../auth/authenticate.js";
import user_get from "../routes/users_routes/user_get.js";
import user_uploadAvatar_post from "../routes/users_routes/user_uploadAvatar_post.js";
import user_checkPassword_post from "../routes/users_routes/user_checkPassword_post.js";
import user_changePassword_post from "../routes/users_routes/user_changePassword_post.js";
import user_updateUserName_post from "../routes/users_routes/user_updateUserName_post.js";


const router = Router();

router.use("/:userId", authenticate);

router.route("/:userId")
    .get(user_get)

router.route("/:userId/upload-avatar")
    .post(user_uploadAvatar_post)

router.route("/:userId/check-password")
    .post(user_checkPassword_post)

router.route("/:userId/update-user-name")
    .post(user_updateUserName_post)

router.route("/:userId/change-password")
    .post(user_changePassword_post)

export default router;