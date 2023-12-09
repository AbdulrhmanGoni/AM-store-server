import forgetPassword_sendVerificationCode_post from "./forgetPassword_sendVerificationCode_post.js";
import forgetPassword_receiveVerificationCode_post from "./forgetPassword_receiveVerificationCode_post.js";
import forgetPassword_changePassword_post from "./forgetPassword_changePassword_post.js";

export default async function forgetPassword_post(req, res, next) {
    try {
        switch (req.query.type) {
            case "changing-password-request": {
                forgetPassword_sendVerificationCode_post(req, res, next);
                break;
            }
            case "proving-email-ownership": {
                forgetPassword_receiveVerificationCode_post(req, res);
                break;
            }
            case "changing-the-password": {
                forgetPassword_changePassword_post(req, res);
                break;
            }
            default: res.status(400).json(); break;
        }
    } catch (error) {
        console.log(error)
        res.status(400).json();
    }
}