import UserModel from "../../models/Users.js";

export const emailToVerify = {};

export default async function verifyUserEmail(req, res) {
    try {
        const { verificationCode, userEmail } = req.body;
        if (verificationCode === emailToVerify[userEmail].code) {
            const { matchedCount, modifiedCount } = await UserModel.updateOne({ _id: req.userId, userEmail }, { hisEmailVerified: true })
            if (matchedCount && modifiedCount) {
                delete emailToVerify[userEmail];
                res.status(200).json({ ok: true });
            }
            else res.status(200).json({ ok: false, message: "Unexpected error" });
        }
        else if (emailToVerify[userEmail].tries >= 3) {
            res.status(400).json({ message: "Verification failed, You entered too invalid codes" });
        }
        else {
            ++emailToVerify[userEmail].tries
            res.status(200).json({ ok: false, message: "Invalid verification code !" });
        }
    } catch (error) {
        res.status(400).json();
    }
}