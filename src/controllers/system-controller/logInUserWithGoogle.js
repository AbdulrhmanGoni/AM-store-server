import jwt from "jsonwebtoken";
import UsersModel from "../../models/Users.js";
import googleAccountGetter from "../../utilities/googleAccountGetter.js";

export default async function logInUserWithGoogle(googleUserAccessToken) {
    try {
        const notFoundResponse = { message: "This email did not signed up with us before, Go to Sign up page" };
        const unexpectedError = { message: "There is unexpected error happened" };
        const response = await googleAccountGetter(googleUserAccessToken);
        if (response) {
            const projection = { userPassword: 1, signingMethod: 1 }
            const userData = await UsersModel.findOne({ userEmail: response.email }, projection);
            if (userData) {
                if (userData.signingMethod === "Google auth") {
                    const userId = userData._id;
                    const token = jwt.sign(
                        { userId, role: "user" },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: "30d" }
                    )
                    return { status: true, userId, accessToken: token };
                }
                else return { message: "This email signed up with another sign up method" }
            }
            else return notFoundResponse
        }
        else if (response === null) return notFoundResponse
        else return unexpectedError
    } catch (error) {
        console.log(error);
        return unexpectedError
    }
}