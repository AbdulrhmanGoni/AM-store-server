import { Router } from "express";
const router = Router();

import paymentMethods_get from "../user_actions/paymentMethods_get.js";
import paymentMethods_set from "../user_actions/paymentMethods_set.js";
import paymentMethods_delete from "../user_actions/paymentMethods_delete.js";

router.route("/:userId/payment-methods")
    .get(paymentMethods_get)
    .post([paymentMethods_set, paymentMethods_get])
    .delete([paymentMethods_delete, paymentMethods_get])


export default router;