import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function users_signUpUser(userData) {

    try {
        const newUser = new UserModel(userData);
        const hashedPassword = bcrypt.hashSync(newUser.userPassword, +process.env.HASHING_SALT_ROUNDS);
        newUser.userPassword = hashedPassword;
        const done = await newUser.save()
            .then(() => {
                const userId = newUser._id;
                const token = jwt.sign(
                    { userId, role: "user" },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "30d" }
                )
                const { userName, avatar, userEmail } = newUser;
                return { userData: { _id: userId, userEmail, userName, avatar }, token }
            })
            .catch((err) => {
                console.log(err)
                return false
            })
        return done
    } catch (error) {
        console.log(error)
        return null
    }
};