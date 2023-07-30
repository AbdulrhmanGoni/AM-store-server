import { Router } from "express";
const router = Router();

import user_logIn from "../user_actions/user_logIn.js";
import user_Logged from "../user_actions/user_Logged.js";
import user_regist from "../user_actions/user_regist.js";
import sendFeedback from "../user_actions/sendFeedback.js";

router.route("/log-in").post(user_logIn);
router.route("/log-in/:userId").get(user_Logged);
router.route("/sing-up").post(user_regist);
router.route("/mails").post(sendFeedback);



export default router;