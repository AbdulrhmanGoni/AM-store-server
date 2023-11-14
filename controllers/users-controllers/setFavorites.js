import UserModel from "../../models/Users.js";


export default async function setFavorites(userId, favorites) {
    try {
        const { modifiedCount, matchedCount } = await UserModel.updateOne({ _id: userId }, { $set: { userFavorites: favorites } });
        return !!(modifiedCount && matchedCount);
    } catch (error) {
        return null;
    }

}