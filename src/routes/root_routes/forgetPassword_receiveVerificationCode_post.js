import jwt from "jsonwebtoken";
import SystemController from "../../controllers/system-controller/SystemController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";

export default asyncRouteHandler(
    async function forgetPassword_receiveVerificationCode_post(req, res) {
        const { verificationEmailsCodesHandler } = SystemController;
        const { status, response } = await verificationEmailsCodesHandler(req.body);
        if (response.ok) {
            const changePasswordToken = jwt.sign(
                { userEmail: req.body.userEmail },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "4m" }
            );
            response.changePasswordToken = changePasswordToken;
        }
        res.status(status).json(response);
    }
)