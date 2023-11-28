import { userDataTypes } from "../../CONSTANT/projections.js";
import UsersModel from "../../models/Users.js";
import signUpUser from "./signUpUser.js";


export default async function registerUserWithGoogle(userData) {
    try {
        const isExist = await UsersModel.findOne({ userEmail: userData.userEmail }, userDataTypes.userEmail);
        if (isExist) return false;
        else {
            const newUser = userData;
            newUser.userPassword = "Signed up with Google";
            newUser.hisEmailVerified = true;

            return await signUpUser(newUser, false);
        }
    } catch (error) {
        console.log(error);
        return;
    }
}