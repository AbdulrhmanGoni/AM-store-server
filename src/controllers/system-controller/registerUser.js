import UsersModel from "../../models/Users.js";
import checkEmailExistance from "../../utilities/checkEmailExistance.js";
import signUpUser from "./signUpUser.js";

export default async function registerUser(userData) {
    try {
        const { userEmail } = userData;
        const isExist = await UsersModel.findOne({ userEmail }, { _id: 1 });
        if (isExist) {
            return { ok: false, message: "Your email already signed up with up, Just log in" };
        }

        const isExistEmail = await checkEmailExistance(userEmail);
        if (!isExistEmail) {
            return {
                ok: false,
                message: isExistEmail === false ?
                    "This email is not active email" : "Error while checking email existance"
            };
        }

        const signingUserResponse = await signUpUser(userData);
        if (signingUserResponse) {
            return { payload: signingUserResponse, ok: true };
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
        return;
    }

}