import UserModel from "../../models/Users";


export default async function clearFavorites(userId) {
    try {
        const { matchedCount, modifiedCount } = await UserModel.updateOne({ _id: userId }, { $set: { userFavorites: [] } });
        return !!(matchedCount && modifiedCount);
    } catch (error) {
        return null;
    }
}
