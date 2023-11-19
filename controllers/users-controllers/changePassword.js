import { userDataTypes } from "../../CONSTANT/projections.js";
import UserModel from "../../models/Users.js";
import { compareSync, hashSync } from "bcrypt";

const changePassword = async (_id, { currentPassword, newPassword }) => {
    try {
        const { userPassword } = await UserModel.findById(_id, userDataTypes.password);
        const result = compareSync(currentPassword, userPassword);
        if (result) {
            const newPasswordHashed = hashSync(newPassword, +process.env.HASHING_SALT_ROUNDS);
            const { modifiedCount } = await UserModel.updateOne({ _id, userPassword },
                { $set: { userPassword: newPasswordHashed } }
            );
            return !!modifiedCount;
        } else return false;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default changePassword;