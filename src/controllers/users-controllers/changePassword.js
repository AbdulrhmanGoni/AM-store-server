import UsersModel from "../../models/Users.js";
import { compareSync } from "bcrypt";
import isUserAllowedToChangeHisPassword from "./isUserAllowedToChangeHisPassword.js";
import SystemController from "../system-controller/SystemController.js";

export default async function changePassword(userId, { currentPassword, newPassword }) {
    try {
        const projection = { userPassword: 1, lastPasswordChange: 1 };
        const { userPassword, lastPasswordChange } = await UsersModel.findById(userId, projection);

        if (isUserAllowedToChangeHisPassword(lastPasswordChange)) {
            const result = compareSync(currentPassword, userPassword);
            if (result) {
                return await SystemController.changeUserPassword({ userId }, newPassword)
            }
            else return false;
        }
        else return null
    } catch (error) {
        console.log(error);
        return;
    }
}