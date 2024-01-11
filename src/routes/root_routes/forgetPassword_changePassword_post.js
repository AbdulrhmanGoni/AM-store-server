import SystemController from "../../controllers/system-controller/SystemController.js";
import { verifyJWT } from "../../utilities/jwtUtilities.js";

export default async function forgetPassword_changePassword_post(req, res) {
    try {
        const { userEmail, changePasswordToken, newPassword } = req.body;
        const result = verifyJWT(changePasswordToken)
        if (result && result?.userEmail === userEmail) {
            const response = await SystemController.changeUserPassword({ userEmail }, newPassword)
            res.status(200).json(response);
        } else {
            res.status(400).json();
        }
    } catch (error) {
        if (error.name == "TokenExpiredError" || error.message == "jwt expired") {
            console.log(error.name)
            res.status(400).json({
                message: "Your changing password token expired",
                changingPasswordTokenExpired: true
            });
        } else {
            console.log(error)
            res.status(400).json();
        }
    }
}