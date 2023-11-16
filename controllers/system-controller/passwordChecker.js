import bcrypt from "bcrypt"
import UserModel from "../../models/Users.js";
import { userDataTypes } from "../../CONSTANT/projections.js";

export default async function passwordChecker(userId, password) {
    try {
        const { userPassword } = await UserModel.findById(userId, userDataTypes.password);
        const result = await bcrypt.compare(password, userPassword);
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}