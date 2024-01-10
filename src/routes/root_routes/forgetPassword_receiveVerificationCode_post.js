import SystemController from "../../controllers/system-controller/SystemController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";
import { generateJWTToken } from "../../utilities/jwtUtilities.js";

export default asyncRouteHandler(
    async function forgetPassword_receiveVerificationCode_post(req, res) {
        const { verificationEmailsCodesHandler } = SystemController;
        const { status, response } = await verificationEmailsCodesHandler(req.body);
        if (response.ok) {
            const changePasswordToken = generateJWTToken({ userEmail: req.body.userEmail }, "4m")
            response.changePasswordToken = changePasswordToken;
        }
        res.status(status).json(response);
    }
)