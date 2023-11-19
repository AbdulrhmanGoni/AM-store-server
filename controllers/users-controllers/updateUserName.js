import UserModel from "../../models/Users.js";

export default async function updateUserName(userId, newName) {
    try {
        const { modifiedCount } = await UserModel.updateOne({ _id: userId }, { $set: { userName: newName } });
        return !!modifiedCount;
    } catch (error) {
        console.log(error);
        return null;
    }
}