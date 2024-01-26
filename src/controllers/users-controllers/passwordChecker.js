import { compare } from "bcrypt";
import UsersModel from "../../models/Users.js";
import isUserAllowedToChangeHisPassword from "./isUserAllowedToChangeHisPassword.js";

export default async function passwordChecker(userId, password) {
    const notAllowedMessage = "You have changed your password since less than a month, You can't change it again, Try again after a month since last change"
    try {
        const projection = { userPassword: 1, lastPasswordChange: 1, signingMethod: 1 };
        const user = await UsersModel.findById(userId, projection);
        if (user) {
            const { userPassword, lastPasswordChange, signingMethod } = user;
            if (signingMethod === "Email & Password") {
                if (isUserAllowedToChangeHisPassword(lastPasswordChange)) {
                    const result = await compare(password, userPassword);
                    return { status: result, message: result ? "" : "Wrong password !" };
                }
                else return { status: false, message: notAllowedMessage };
            }
            else return { status: false, message: "You didn't signed up using (Email & Password) method" };
        }
        else return { status: false, message: "Error !" }
    } catch (error) {
        console.log(error)
        return { status: false, message: "Unexpected Error !" }
    }
}