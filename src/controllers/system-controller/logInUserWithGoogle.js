import jwt from "jsonwebtoken";
import UsersModel from "../../models/Users.js";
import googleAccountGetter from "../../utilities/googleAccountGetter.js";

export default async function logInUserWithGoogle(googleUserAccessToken) {
    try {
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
                    return { userId, accessToken: token };
                }
                else return false;
            }
            else return null;
        }
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
}