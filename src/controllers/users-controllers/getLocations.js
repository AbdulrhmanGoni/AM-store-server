import UsersModel from '../../models/Users.js';

export default async function getLocations(userId) {
    try {
        const projection = { userAddress: 1, _id: 0 }
        const { userAddress } = await UsersModel.findById(userId, projection);
        return userAddress;
    } catch (error) {
        return null;
    }
}
