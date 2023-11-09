import getRandomInt from "../functions/randomNumber.js";
import UserModel from "../models/Users.js"
import sendVerificationEmailMail from "./sendVerifictionEmailMail.js";
import { emailToVerify } from "./verifyUserEmail.js";


export default async function userEmailVerification(req, res) {
    try {
        const user = await UserModel.findById(req.userId);
        if (user) {
            const { userEmail, userName, hisEmailVerified } = user;
            
            if (hisEmailVerified) {
                res.status(200).json({ ok: false, message: "Your email is already verifyed!" })
            } else {
                const verificationCode = getRandomInt(100000, 999999);
                emailToVerify[userEmail] = {};
                emailToVerify[userEmail].code = verificationCode;
                emailToVerify[userEmail].tries = 1;
                const response = await sendVerificationEmailMail({ userEmail, userName }, verificationCode)
                response && res.status(200).json({ ok: true });
                !response && res.status(400).json();
            }
        } else {
            res.status(400).json();
        }
    } catch (error) {
        console.log(error)
        res.status(400).json();
    }
}
