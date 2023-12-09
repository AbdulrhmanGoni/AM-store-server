import SystemController from "../../controllers/system-controller/SystemController.js";
import UsersModel from "../../models/Users.js";
import htmlEmailTemplate from "../../utilities/htmlEmailTemplate.js";
import genRandomNumber from '../../utilities/genRandomNumber.js';


export default async function emailVerification_get(req, res) {
    try {
        const user = await UsersModel.findById(req.userId);
        if (user) {
            const { userEmail, userName, hisEmailVerified } = user;

            if (hisEmailVerified) {
                res.status(200).json({ ok: false, message: "Your email is already verifyed!" });
            } else {
                const verificationCode = genRandomNumber(6);
                const subject = "AM Store Email Verification";
                const body = `\
                Wellcome to AM Store ${userName}, Here is your verification code '${verificationCode}', \
                copy it and go back to verification page on AM Store and paste the code there`;
                const htmlTemplate = htmlEmailTemplate({ userName }, verificationCode);
                const mailContent = { userEmail, subject, body, htmlTemplate, verificationCode }

                const response = await SystemController.sendVerificationCodeToEmail(mailContent);
                response && res.status(200).json({ ok: true });
                !response && res.status(400).json();
            }
        } else res.status(400).json();
    } catch (error) {
        console.log(error)
        res.status(400).json();
    }
}