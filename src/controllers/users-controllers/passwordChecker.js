import { compare } from "bcrypt"
import UsersModel from "../../models/Users.js";

export default async function passwordChecker(userId, password) {
    try {
        const projection = { userPassword: 1, lastPasswordChange: 1 };
        const user = await UsersModel.findById(userId, projection);
        if (user) {

            const { userPassword, lastPasswordChange } = user;
            const currentMonth = new Date().getMonth();
            const lastMonth = new Date(new Date().setMonth(currentMonth - 1)).getTime();
            const lastChange = new Date(lastPasswordChange).getTime();

            if (lastMonth > lastChange) return await compare(password, userPassword);
            else return null;
        }
        else return;
    } catch (error) {
        console.log(error)
        return;
    }
}