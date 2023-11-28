import UsersModel from "../../models/Users.js";


export default async function clearFavorites(userId) {
    try {
        const { matchedCount } = await UsersModel.updateOne({ _id: userId }, { $set: { userFavorites: [] } });
        return !!matchedCount
    } catch (error) {
        return null;
    }
}
