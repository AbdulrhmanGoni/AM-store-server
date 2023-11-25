import jwt from "jsonwebtoken";
import UserModel from "../../models/Users.js";

export default async function logInUserWithGoogle({ userEmail }) {
    try {
        const userData = await UserModel.findOne({ userEmail }, { userPassword: true });
        if (userData) {
            if (userData?.userPassword === "Signed up with Google") {
                const userId = userData._id;
                const token = jwt.sign(
                    { userId, role: "user" },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "30d" }
                )
                return { userId, accessToken: token };
            } else return false;
        }
        return null;
    } catch (error) {
        console.log(error);
        return;
    }
}