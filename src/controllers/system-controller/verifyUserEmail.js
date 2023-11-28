import UsersModel from "../../models/Users.js";

export default async function verifyUserEmail(userId, userEmail) {
    try {
        const { modifiedCount } = await UsersModel.updateOne({ _id: userId, userEmail }, { hisEmailVerified: true });
        return !!modifiedCount;
    } catch (error) {
        console.log(error)
        return null;
    }
}