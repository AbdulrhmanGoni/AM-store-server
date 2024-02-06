import forgetPassword_sendVerificationCode_post from "./forgetPassword_sendVerificationCode_post.js";
import forgetPassword_receiveVerificationCode_post from "./forgetPassword_receiveVerificationCode_post.js";
import forgetPassword_changePassword_post from "./forgetPassword_changePassword_post.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function forgetPassword_post(req, res, next) {
        switch (req.query.type) {
            case "changing-password-request": {
                forgetPassword_sendVerificationCode_post(req, res, next);
                break;
            }
            case "proving-email-ownership": {
                forgetPassword_receiveVerificationCode_post(req, res);
                break;
            }
            case "complete-changing-password": {
                forgetPassword_changePassword_post(req, res);
                break;
            }
            default: res.status(400).json(); break;
        }
    }
)