import UsersModel from "../../models/Users.js";


export default async function setFavorites(userId, favorites) {
    try {
        const { modifiedCount } = await UsersModel.updateOne({ _id: userId }, { $set: { userFavorites: favorites } });
        return !!modifiedCount
    } catch (error) {
        return null;
    }

}