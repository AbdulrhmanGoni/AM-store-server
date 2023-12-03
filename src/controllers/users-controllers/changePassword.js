import { userDataTypes } from "../../CONSTANT/projections.js";
import UsersModel from "../../models/Users.js";
import { compareSync, hashSync } from "bcrypt";

export default async function changePassword(userId, { currentPassword, newPassword }) {
    try {
        const { userPassword } = await UsersModel.findById(userId, userDataTypes.password);
        const result = compareSync(currentPassword, userPassword);
        if (result) {
            const newPasswordHashed = hashSync(newPassword, +process.env.HASHING_SALT_ROUNDS);
            const { modifiedCount } = await UsersModel.updateOne({ _id: userId, userPassword },
                { $set: { userPassword: newPasswordHashed } }
            );
            return !!modifiedCount;
        } else return false;
    } catch (error) {
        console.log(error);
        return null;
    }
}