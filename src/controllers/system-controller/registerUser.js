import UsersModel from "../../models/Users.js";
import checkEmailExistance from "../../utilities/checkEmailExistance.js";
import signUpUser from "./signUpUser.js";

export default async function registerUser(userData) {
    try {
        const { userEmail } = userData;
        const isExist = await UsersModel.findOne({ userEmail }, { _id: 1 });
        if (isExist) {
            return { ok: false, message: "This email is already registred" };
        }

        const isExistEmail = await checkEmailExistance(userEmail);
        if (!isExistEmail) {
            return { ok: false, message: "This email is not active email" };
        }

        const signingUserResponse = await signUpUser(req.body);
        if (signingUserResponse) {
            return { payload: signingUserResponse, ok: true };
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
        return null;
    }

}