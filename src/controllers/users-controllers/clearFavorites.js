import UserModel from "../../models/Users.js";


export default async function clearFavorites(userId) {
    try {
        const { matchedCount } = await UserModel.updateOne({ _id: userId }, { $set: { userFavorites: [] } });
        return !!matchedCount
    } catch (error) {
        return null;
    }
}
