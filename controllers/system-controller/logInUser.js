import jwt from "jsonwebtoken";
import UserModel from "../../models/Users.js";
import { compareSync } from "bcrypt";


export default async function logInUser({ userEmail, userPassword }) {
    try {
        const userData = await UserModel.findOne({ userEmail }, { userPassword: true });
        if (userData) {
            const pass = compareSync(userPassword, userData.userPassword);
            if (pass) {
                const token = jwt.sign(
                    { userId: userData._id, role: "user" },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "30d" }
                );
                return { userId: userData._id, accessToken: token };
            }
        }
        return false;
    } catch (error) {
        console.log(error)
        return null;
    }
}