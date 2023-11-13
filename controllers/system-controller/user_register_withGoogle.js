import { userDataTypes } from "../../CONSTANT/projections.js";
import UserModel from "../../models/Users.js";
import users_signUpUser from "./users_signUpUser.js";


const user_regist_withGoogle = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const isExist = await UserModel.findOne({ userEmail }, userDataTypes.userEmail);
        if (isExist) res.status(200).json(false);
        else {
            const newUser = req.body;
            newUser.userPassword = "Signed up with Google";
            newUser.hisEmailVerified = true;

            const signingUserResponse = await users_signUpUser(newUser);
            signingUserResponse && res.status(201).json({ payload: signingUserResponse, ok: true });
            !signingUserResponse && res.status(400).json();
        }
    } catch (error) {
        console.log(error);
        res.status(400).json();
    }
}

export default user_regist_withGoogle;