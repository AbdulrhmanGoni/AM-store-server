import SystemController from "../../controllers/system-controller/SystemController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";
import { generateJWT } from "../../utilities/jwtUtilities.js";

export default asyncRouteHandler(
    async function forgetPassword_receiveVerificationCode_post(req, res) {
        const { verificationEmailsCodesHandler } = SystemController;
        const { verificationCode, userEmail } = req.body
        const { status, response } = verificationEmailsCodesHandler({ verificationCode, userEmail });
        if (response.ok) {
            const changePasswordToken = generateJWT({ userEmail, job: "changing user password" }, "4m")
            response.changePasswordToken = changePasswordToken;
        }
        res.status(status).json(response);
    }
)