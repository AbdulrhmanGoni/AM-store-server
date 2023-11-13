import UserModel from "../../models/Users.js";
import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

export default async function users_signUpUser(userData) {

    try {
        const { HASHING_SALT_ROUNDS, JWT_SECRET_KEY } = process.env;
        const newUser = new UserModel(userData);
        const hashedPassword = hashSync(newUser.userPassword, +HASHING_SALT_ROUNDS);
        newUser.userPassword = hashedPassword;
        const done = await newUser.save()
            .then(() => {
                const userId = newUser._id;
                const token = jwt.sign({ userId, role: "user" }, JWT_SECRET_KEY, { expiresIn: "30d" })
                const { userName, avatar, userEmail, hisEmailVerified } = newUser;
                return {
                    userData: {
                        _id: userId,
                        userEmail,
                        userName,
                        avatar,
                        hisEmailVerified
                    },
                    token
                }
            })
            .catch((err) => {
                console.log(err)
                return false
            })
        return done;
    } catch (error) {
        console.log(error);
        return false;
    }
};