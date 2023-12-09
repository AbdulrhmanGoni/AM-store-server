import SystemController from "../../controllers/system-controller/SystemController.js";
import UsersModel from "../../models/Users.js";
import ErrorGenerator from "../../utilities/ErrorGenerator.js";
import genRandomNumber from "../../utilities/genRandomNumber.js";


export default async function forgetPassword_sendVerificationCode_post(req, res, next) {
    const failResponse = (message) => { next(new ErrorGenerator(message, 400)) };
    try {
        const { userEmail } = req.body;
        if (!userEmail) return failResponse("Failed to access the email from the server !");

        const projection = { signingMethod: 1, userEmail: 1, userName: 1 };
        const user = await UsersModel.findOne({ userEmail }, projection);

        if (user) {
            const { signingMethod, userEmail, userName } = user;
            if (signingMethod == "Email & Password") {
                const verificationCode = genRandomNumber(6);
                const subject = "AM Store Changing Password Request";
                const body =
                    `Hi ${userName}, Here is your verification code '${verificationCode}' ` +
                    "to change your password that you forgot it, copy it and go back to 'forget-password' page"
                    + " on AM Store and paste the code there to continue changing your password";
                const mailContent = { userEmail, userName, subject, body, verificationCode };

                const response = await SystemController.sendVerificationCodeToEmail(mailContent);
                if (response) res.status(200).json(true);
                else failResponse("Sending cheking code to your email failed for unknown reason.");
            }
            else failResponse("This email didn't signed up using (Email & Password) method.");
        }
        else failResponse("This email didn't signed in our store before.");
    } catch (error) {
        console.log(error)
        failResponse("Error happened while sending cheking code to your email.");
    }
}