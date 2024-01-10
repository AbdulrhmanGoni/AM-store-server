import UsersModel from "../../models/Users.js";
import { compareSync } from "bcrypt";
import { generateJWTToken } from "../../utilities/jwtUtilities.js";


export default async function logInUser({ userEmail, userPassword }) {
    try {
        const userData = await UsersModel.findOne({ userEmail }, { userPassword: true, signingMethod: 1 });
        if (userData) {
            if (userData.signingMethod === "Google auth") {
                return { message: "This email signed up with another sign up method" }
            } else {
                const pass = compareSync(userPassword, userData.userPassword);
                if (pass) {
                    const token = generateJWTToken({ userId: userData._id, role: "user" })
                    return { status: true, userId: userData._id, accessToken: token };
                }
                else return { message: "There is error in Email or Password" };
            }
        } else return { message: "This email did not signed up with us before, Go to Sign up page" };
    } catch (error) {
        console.log(error)
        return { message: "There is unexpected error" }
    }
}