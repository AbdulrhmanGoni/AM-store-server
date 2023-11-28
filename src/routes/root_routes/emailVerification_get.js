import SystemController from "../../controllers/system-controller/SystemController.js";
import UsersModel from "../../models/Users.js";


export default async function emailVerification_get(req, res) {
    try {
        const user = await UsersModel.findById(req.userId);
        if (user) {
            const { userEmail, userName, hisEmailVerified } = user;

            if (hisEmailVerified) {
                res.status(200).json({ ok: false, message: "Your email is already verifyed!" });
            } else {
                const response = await SystemController.sendVerificationEmailMail({ userEmail, userName });
                response && res.status(200).json({ ok: true });
                !response && res.status(400).json();
            }
        } else res.status(400).json();
    } catch (error) {
        console.log(error)
        res.status(400).json();
    }
}