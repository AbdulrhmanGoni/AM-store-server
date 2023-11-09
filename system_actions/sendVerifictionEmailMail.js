import sendEmail from '../functions/sendEmail.js'
import emailHtmlTemplate from '../functions/emailHtmlTemplate.js'

export default async function sendVerificationEmailMail({ userName, userEmail }, verificationCode) {
    try {
        if (verificationCode && userName && userEmail) {
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

