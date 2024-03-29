import UsersModel from "../../models/Users.js";
import { hashSync } from "bcrypt";
import { generateJWT } from "../../utilities/jwtUtilities.js";

export default async function signUpUser(userData) {

    try {
        const { HASHING_SALT_ROUNDS } = process.env;
        const newUser = new UsersModel(userData);
        const hashedPassword = hashSync(newUser.userPassword, +HASHING_SALT_ROUNDS);
        newUser.userPassword = hashedPassword;
        const result = await newUser.save()
            .then(() => {
                const userId = newUser._id;
                const token = generateJWT({ userId, role: "user" });
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