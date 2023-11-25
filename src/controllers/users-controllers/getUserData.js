import UserModel from '../../models/Users.js';

export default async function getUserData(userId, projections = {}) {
    try {
        return await UserModel.findById(userId, projections);
    } catch (error) {
        console.log(error)
        return null;
    }
}