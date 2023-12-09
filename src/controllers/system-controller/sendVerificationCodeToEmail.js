import sendEmail from '../../utilities/sendEmail.js'

export const emailsToVerify = {};

export default async function sendVerificationCodeToEmail(mailContent, { timeout = 60000 * 5 } = {}) {
    try {
        const { userEmail, subject, body, htmlTemplate, verificationCode } = mailContent;
        if (userEmail) {
            if (emailsToVerify[userEmail]) {
                return true;
            }

            emailsToVerify[userEmail] = {};
            emailsToVerify[userEmail].code = verificationCode;
            emailsToVerify[userEmail].tries = 1;

            const timeoutId = setTimeout(() => {
                delete emailsToVerify[userEmail];
            }, timeout);

            emailsToVerify[userEmail].timeoutId = timeoutId;

            return await sendEmail(userEmail, subject, body, htmlTemplate);
        } else return null;
    } catch (error) {
        console.log(error)
        return false;
    }
}

