import { userDataTypes } from "../../CONSTANT/projections.js";
import UsersModel from "../../models/Users.js";
import googleAccountGetter from "../../utilities/googleAccountGetter.js";
import signUpUser from "./signUpUser.js";


export default async function registerUserWithGoogle(googleUserAccessToken) {
    try {
        const response = await googleAccountGetter(googleUserAccessToken);
        const { googleResponse, ok } = response
        if (ok) {
            const isExist = await UsersModel.findOne({ userEmail: googleResponse.email }, userDataTypes.userEmail);
            if (isExist) return { ok: false, message: "Your email already signed up, Just log in" };
            else {
                const userData = {
                    userName: googleResponse.name,
                    userEmail: googleResponse.email,
                    userPassword: googleResponse.sub,
                    signingMethod: "Google",
                    hisEmailVerified: !!googleResponse.email_verified
                };
                const signingUserResponse = await signUpUser(userData);
                if (signingUserResponse) return { ok: true, payload: signingUserResponse };
                else return { ok: false, message: "Signing process failed for unknown reason, Try again" };
            }
        } else {
            return googleResponse
        }
    } catch (error) {
        console.log(error);
        return;
    }
}