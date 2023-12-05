import { userDataTypes } from "../../CONSTANT/projections.js";
import UsersModel from "../../models/Users.js";
import googleAccountGetter from "../../utilities/googleAccountGetter.js";
import signUpUser from "./signUpUser.js";


export default async function registerUserWithGoogle(googleUserAccessToken) {
    try {
        const response = await googleAccountGetter(googleUserAccessToken);
        if (response) {
            const isExist = await UsersModel.findOne({ userEmail: response.email }, userDataTypes.userEmail);
            if (isExist) return { ok: false, message: "Your email already signed up, Just log in" };
            else {
                const userData = {
                    userName: response.name,
                    userEmail: response.email,
                    userPassword: "Signed up with Google",
                    signingMethod: "Google auth",
                    hisEmailVerified: response.email_verified
                };
                const signingUserResponse = await signUpUser(userData, false);
                if (signingUserResponse) return { ok: true, payload: signingUserResponse };
                else return { ok: false, message: "Signing process failed for unknown reason, Try again" };
            }
        } else {
            return response === null ?
                { ok: false, message: "Conniction with google failed for unknown reason, Try again" }
                : undefined;
        }
    } catch (error) {
        console.log(error);
        return;
    }
}