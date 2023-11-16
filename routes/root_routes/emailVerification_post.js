import SystemController from "../../controllers/system-controller/SystemController.js";
import { emailsToVerify } from "../../controllers/system-controller/sendVerifictionEmailMail.js";


export default async function emailVerification_post(req, res) {
    try {
        const { verificationCode, userEmail } = req.body;
        if (verificationCode === emailsToVerify[userEmail].code) {
            const verifyingRespond = await SystemController.verifyUserEmail(req.userId, userEmail)
            if (verifyingRespond) {
                delete emailsToVerify[userEmail];
                res.status(200).json({ ok: true });
            }
            else res.status(200).json({ ok: false, message: "Unexpected error" });
        }
        else if (emailsToVerify[userEmail].tries >= 3) {
            res.status(400).json({ message: "Verification failed, You entered too invalid codes" });
        }
        else {
            ++emailsToVerify[userEmail].tries;
            res.status(200).json({ ok: false, message: "Invalid verification code !" });
        }
    } catch (error) {
        res.status(400).json();
    }
}