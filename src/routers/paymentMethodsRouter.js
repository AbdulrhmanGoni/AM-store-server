import { Router } from "express";
import user_paymentMethods_get from "../routes/users_routes/user_paymentMethods_get.js";
import user_paymentMethods_post from "../routes/users_routes/user_paymentMethods_post.js";
import user_paymentMethods_delete from "../routes/users_routes/user_paymentMethods_delete.js";
import userIdChecker from "../middlewares/userIdChecker.js";

const router = Router();

router.route("/:userId/payment-methods")
    .all(userIdChecker)
    .get(user_paymentMethods_get)
    .post(user_paymentMethods_post)
    .delete(user_paymentMethods_delete)


export default router;