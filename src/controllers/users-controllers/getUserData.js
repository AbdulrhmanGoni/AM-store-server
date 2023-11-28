import UsersModel from '../../models/Users.js';

export default async function getUserData(userId, projections = {}) {
    try {
        return await UsersModel.findById(userId, projections);
    } catch (error) {
        console.log(error)
        return null;
    }
}