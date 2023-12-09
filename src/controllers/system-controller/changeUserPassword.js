import { hashSync } from "bcrypt";
import UsersModel from "../../models/Users.js";

export default async function changeUserPassword({ userId, userEmail }, newPassword) {
    try {
        const newPasswordHashed = hashSync(newPassword, +process.env.HASHING_SALT_ROUNDS);
        const filter = { $or: [{ _id: userId }, { userEmail }] };
        const updateQuery = {
            $set: {
                userPassword: newPasswordHashed,
                lastPasswordChange: new Date().toISOString()
            }
        }
        const { modifiedCount } = await UsersModel.updateOne(filter, updateQuery);
        return !!modifiedCount;
    } catch (error) {
        console.log(error)
        return;
    }
}
