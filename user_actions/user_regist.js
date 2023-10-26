import UserModel from "../models/Users.js";
import checkEmailExistance from "../functions/checkEmailExistance.js";
import users_signUpUser from "./users_signUpUser.js";


const user_regist = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const isExist = await UserModel.findOne({ userEmail }, { _id: 1 });
        if (isExist) {
            res.status(200).json({ ok: false, message: "This email already registred" });
            return
        }
        const isExistEmail = await checkEmailExistance(userEmail)
        if (!isExistEmail) {
            res.status(200).json({ ok: false, message: "This email is not active" });
            return
        }
        const userSignedCompletely = await users_signUpUser(req.body);
        res.status(userSignedCompletely ? 200 : 400).json({
            payload: userSignedCompletely,
            ok: true
        })
    } catch (error) {
        console.log(error);
        res.status(400).json(null);
    }
}

export default user_regist;