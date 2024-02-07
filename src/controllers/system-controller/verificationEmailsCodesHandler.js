import { emailsToVerify } from "../../controllers/system-controller/sendVerificationCodeToEmail.js";

export default function verificationEmailsCodesHandler({ verificationCode, userEmail }, { maxTrise = 3 } = {}) {
    try {
        const userEmailConfig = emailsToVerify[userEmail];

        if (!userEmailConfig) {
            return { status: 408, response: { message: "Verification Code expired" } }
        }
        else if (verificationCode === userEmailConfig.code) {
            clearTimeout(userEmailConfig.timeoutId);
            delete emailsToVerify[userEmail];
            return { status: 200, response: { ok: true } }
        }
        else if (userEmailConfig.tries >= maxTrise) {
            delete emailsToVerify[userEmail];
            clearTimeout(userEmailConfig.timeoutId);
            return { status: 400, response: { message: "Verification failed, You entered too invalid codes" } }
        }
        else {
            ++userEmailConfig.tries
            return { status: 200, response: { ok: false, message: "Invalid verification code !" } }
        }
    } catch (error) {
        console.log(error)
        return { status: 400, response: { message: "Processing verification code failed for unexpected error!" } }
    }
};