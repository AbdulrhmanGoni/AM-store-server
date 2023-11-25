import { Router } from "express";
const router = Router();

import authenticate from "../auth/authenticate.js";
import user_paymentMethods_get from "../routes/users_routes/user_paymentMethods_get.js";
import user_paymentMethods_post from "../routes/users_routes/user_paymentMethods_post.js";
import user_paymentMethods_delete from "../routes/users_routes/user_paymentMethods_delete.js";

router.use("/:userId", authenticate);

router.route("/:userId/payment-methods")
    .get(user_paymentMethods_get)
    .post(user_paymentMethods_post)
    .delete(user_paymentMethods_delete)


export default router;