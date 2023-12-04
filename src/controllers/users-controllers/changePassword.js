import UsersModel from "../../models/Users.js";
import { compareSync, hashSync } from "bcrypt";

export default async function changePassword(userId, { currentPassword, newPassword }) {
    try {
        const projection = { userPassword: 1, lastPasswordChange: 1 };
        const { userPassword, lastPasswordChange } = await UsersModel.findById(userId, projection);

        const currentMonth = new Date().getMonth();
        const lastMonth = new Date(new Date().setMonth(currentMonth - 1)).getTime();
        const lastChange = new Date(lastPasswordChange).getTime();

        if (lastMonth > lastChange) {
            const result = compareSync(currentPassword, userPassword);
            if (result) {
                const newPasswordHashed = hashSync(newPassword, +process.env.HASHING_SALT_ROUNDS);
                const { modifiedCount } = await UsersModel.updateOne({ _id: userId, userPassword },
                    {
                        $set: {
                            userPassword: newPasswordHashed, 
                            lastPasswordChange: new Date().toISOString()
                        }
                    }
                );
                return !!modifiedCount;
            } else return false;
        }
        else return null
    } catch (error) {
        console.log(error);
        return;
    }
}