import SystemController from "../../controllers/system-controller/SystemController.js";
import { emailsToVerify } from "../../controllers/system-controller/sendVerificationCodeToEmail.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";


export default asyncRouteHandler(
    async function emailVerification_post(req, res) {

        const { verificationCode, userEmail } = req.body;
        const EVConfig = emailsToVerify[userEmail];

        if (!EVConfig) {
            res.status(408).json({ message: "Verification Code expired, Refrech the page and try again" });
        }
        else if (verificationCode === EVConfig.code) {
            const verifyingRespond = await SystemController.verifyUserEmail(req.userId, userEmail)
            if (verifyingRespond) {
                clearImmediate(EVConfig.timeoutId);
                delete emailsToVerify[userEmail];
                res.status(200).json({ ok: true });
            }
            else res.status(200).json({ ok: false, message: "Unexpected error" });
        }
        else if (EVConfig.tries >= 3) {
            delete emailsToVerify[userEmail];
            clearImmediate(EVConfig.timeoutId);
            res.status(400).json({ message: "Verification failed, You entered too invalid codes" });
        }
        else {
            ++EVConfig.tries;
            res.status(200).json({ ok: false, message: "Invalid verification code !" });
        }
    }
)