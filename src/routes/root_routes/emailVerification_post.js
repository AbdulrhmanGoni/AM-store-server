import SystemController from "../../controllers/system-controller/SystemController.js";
import verificationEmailsCodesHandler from "../../controllers/system-controller/verificationEmailsCodesHandler.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";


export default asyncRouteHandler(
    async function emailVerification_post(req, res) {
        const { verificationCode, userEmail } = req.body;
        const { status, response } = verificationEmailsCodesHandler({ verificationCode, userEmail })
        if (response.ok) {
            const verifyingRespond = await SystemController.verifyUserEmail(req.userId, userEmail)
            if (!verifyingRespond) {
                return res.status(400).json({ message: "Verifying your email failed for unknown reason" })
            }
        }
        res.status(status).json(response)
    }
)