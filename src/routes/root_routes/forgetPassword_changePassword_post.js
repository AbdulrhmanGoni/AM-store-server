import SystemController from "../../controllers/system-controller/SystemController.js";
import jwt from "jsonwebtoken";

export default async function forgetPassword_changePassword_post(req, res) {
    try {
        const { userEmail, changePasswordToken, newPassword } = req.body;
        const result = jwt.verify(changePasswordToken, process.env.JWT_SECRET_KEY);
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