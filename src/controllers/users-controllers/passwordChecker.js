import { compare } from "bcrypt";
import UsersModel from "../../models/Users.js";

export default async function passwordChecker(userId, password) {
    try {
        const projection = { userPassword: 1, lastPasswordChange: 1 };
        const user = await UsersModel.findById(userId, projection);
        if (user) {
            const { userPassword, lastPasswordChange } = user;
            if (isUserAllowedToChangehisPassword(lastPasswordChange))
                return await compare(password, userPassword);
            else return null;
        }
        else return;
    } catch (error) {
        console.log(error)
        return;
    }
}