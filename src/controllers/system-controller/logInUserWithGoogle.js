import jwt from "jsonwebtoken";
import UsersModel from "../../models/Users.js";
import googleAccountGetter from "../../utilities/googleAccountGetter.js";
import messageResponse from "../../utilities/messageResponse.js";

export default async function logInUserWithGoogle(googleUserAccessToken) {
    try {
        const response = await googleAccountGetter(googleUserAccessToken);
        const { googleResponse, ok } = response
        if (ok) {
            const projection = { userPassword: 1, signingMethod: 1 }
            const userData = await UsersModel.findOne({ userEmail: googleResponse.email }, projection);
            if (userData) {
                if (userData.signingMethod === "Google auth") {
                    const userId = userData._id;
                    const token = jwt.sign(
                        { userId, role: "user" },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: "30d" }
                    )
                    return { status: 200, response: { ok: true, userId, accessToken: token } };
                }
                else return messageResponse("This email signed up with another sign up method")
            }
            else return messageResponse("This email did not signed up with us before, Go to Sign up page")
        }
        else return googleResponse
    } catch (error) {
        console.log(error);
        return messageResponse("There is unexpected error happened")
    }
}