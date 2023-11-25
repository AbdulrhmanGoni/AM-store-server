import sendEmail from '../../functions/sendEmail.js'
import emailHtmlTemplate from '../../functions/emailHtmlTemplate.js'
import getRandomNumber from '../../functions/getRandomNumber.js';

export const emailsToVerify = {};

export default async function sendVerificationEmailMail({ userName, userEmail }) {
    try {
        if (userName && userEmail) {
            const verificationCode = getRandomNumber(100000, 999999);

            if (emailsToVerify[userEmail] && !emailsToVerify[userEmail].expired) {
                console.log("the code already sent");
                return true;
            }

            emailsToVerify[userEmail] = {};
            emailsToVerify[userEmail].code = verificationCode;
            emailsToVerify[userEmail].tries = 1;
            
            const timeoutId = setTimeout(() => {
                delete emailsToVerify[userEmail];
            }, 60000 * 5);
            
            emailsToVerify[userEmail].timeoutId = timeoutId;

            const subject = "AM Store Email Verification";
            const body = `Wellcome to AM Store ${userName}, Here is your verification code '${verificationCode}', copy it and go back to AM Store and paste the code there`;
            const htmlTemplate = emailHtmlTemplate({ userName }, verificationCode);

            return await sendEmail(userEmail, subject, body, htmlTemplate);
        } else return false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

