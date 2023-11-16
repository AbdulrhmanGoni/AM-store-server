import { Router } from "express";
import authenticate from "../auth/authenticate.js";
import user_get from "../routes/users_routes/user_get.js";
import user_post from "../routes/users_routes/user_post.js";
import user_uploadAvatar_post from "../routes/users_routes/user_uploadAvatar_post.js";
import user_password_post from "../routes/users_routes/user_password_post.js";


const router = Router();

router.use("/:userId", authenticate);

router.route("/:userId")
    .get(user_get)
    .post(user_post)

router.route("/:userId/upload-avatar")
    .post(user_uploadAvatar_post)

router.route("/:userId/password")
    .post(user_password_post)

export default router;