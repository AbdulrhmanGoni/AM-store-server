import { emailsToVerify } from "../../controllers/system-controller/sendVerificationCodeToEmail.js";

export default async function verificationEmailsCodesHandler({ verificationCode, userEmail }, { maxTrise = 3 } = {}) {
    try {
        const EVConfig = emailsToVerify[userEmail];

        if (!EVConfig) {
            return { status: 408, response: { message: "Verification Code expired" } }
        }
        else if (verificationCode === EVConfig.code) {
            clearImmediate(EVConfig.timeoutId);
            delete emailsToVerify[userEmail];
            return { status: 200, response: { ok: true } }
        }
        else if (EVConfig.tries >= maxTrise) {
            delete emailsToVerify[userEmail];
            clearImmediate(EVConfig.timeoutId);
            return { status: 400, response: { message: "Verification failed, You entered too invalid codes" } }
        }
        else {
            ++EVConfig.tries
            return { status: 200, response: { ok: false, message: "Invalid verification code !" } }
        }

    } catch (error) {
        console.log(error)
        return { status: 400, response: { message: "Processing verification code failed for unexpected error!" } }
    }
};