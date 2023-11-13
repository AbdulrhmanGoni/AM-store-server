import UserModel from "../../models/Users.js";
import checkEmailExistance from "../../functions/checkEmailExistance.js";
import users_signUpUser from "./users_signUpUser.js";


const user_regist = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const isExist = await UserModel.findOne({ userEmail }, { _id: 1 });
        if (isExist) {
            return res.status(200).json({ ok: false, message: "This email is already registred" });
        }

        const isExistEmail = await checkEmailExistance(userEmail);
        if (!isExistEmail) {
            return res.status(200).json({ ok: false, message: "This email is not active email" });
        }
        const signingUserResponse = await users_signUpUser(req.body);

        signingUserResponse && res.status(201).json({ payload: signingUserResponse, ok: true })
        !signingUserResponse && res.status(400).json()
    } catch (error) {
        console.log(error);
        res.status(400).json();
    }
}

export default user_regist;