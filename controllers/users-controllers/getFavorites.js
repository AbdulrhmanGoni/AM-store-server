import UserModel from "../../models/Users.js";

export default async function getFavorites(userId, projections = {}) {
    try {
        const { userFavorites } = await UserModel.findById(userId, projections);
        return userFavorites;
    } catch (error) {
        console.log(error);
        return null
    }
}
