import UsersModel from "../../models/Users.js";
import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

export default async function signUpUser(userData, hashingPassword = true) {

    try {
        const { HASHING_SALT_ROUNDS, JWT_SECRET_KEY } = process.env;
        const newUser = new UsersModel(userData);
        if (hashingPassword) {
            const hashedPassword = hashSync(newUser.userPassword, +HASHING_SALT_ROUNDS);
            newUser.userPassword = hashedPassword;
        }
        const result = await newUser.save()
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
                return;
            })
        return result;
    } catch (error) {
        console.log(error);
        return;
    }
};